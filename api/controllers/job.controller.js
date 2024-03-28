const mongoose = require("mongoose");
const User = require("../models/user.model");
const Job = require("../models/job.model");
const Company = require("../models/company.model");
const Skill = require("../models/skill.model");
const { sendEmail } = require("../middlewares/mail.middleware");
const notificationModel = require("../models/notification.model");
const main = require("../server");

// companyRoutes.js

const addJob = async (req, res, next) => {
  try {
    const { ownerId, ...jobDetails } = req.body;

    if (!ownerId) {
      return res.status(400).json({ error: "OwnerId must be provided" });
    }

    const user = await User.findById(ownerId);
    if (!user) {
      const company = await Company.findById(ownerId);
      if (!company) {
        return res.status(400).json({ error: "Owner not found" });
      }
      /*if (company.verified === false) {
        return res.status(400).json({ message: "Company not verified" });
      }*/
      const jobOffer = new Job({
        company: ownerId,
        ...jobDetails,
      });

      await jobOffer.save();

      return res
        .status(201)
        .json({ message: "Job offer created successfully", jobOffer });
    }

    const jobOffer = new Job({
      owner: ownerId,
      ...jobDetails,
    });

    await jobOffer.save();

    res
      .status(201)
      .json({ message: "Job offer created successfully", jobOffer });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create job offer: ${error.message}` });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const q = req.query;
    const filters = {
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
      ...(q.jobType && { jobType: q.jobType }),
      ...(q.offerType && { offerType: q.offerType }),
      ...(q.skills && {
        skills: {
          $in: (await Skill.find({ name: { $in: q.skills } })).map(
            (skill) => skill._id
          ),
        },
      }),
    };

    const jobs = await Job.find(filters)
      .select("-acceptedAppliers")
      .populate("company", "companyName companyLogo")
      .populate("owner", "firstname lastname picturePath")
      .populate("skills");

    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);

    return res
      .status(500)
      .json({ message: "An error occurred while fetching jobs." });
  }
};

const updateJob = async (req, res, next) => {
  const { ...jobDetails } = req.body;
  const jobId = req.params.id;
  let job;
  try {
    job = await Job.findByIdAndUpdate(jobId, {
      ...jobDetails,
    });
    res.status(201).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Failed to update job offers: ${error.message}` });
  }
};

const geJobById = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;

    // Find the company based on the companyId
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    // Find all job offers related to the company and populate the 'company' field
    const jobOffers = await Job.find({ company: companyId })
      .populate("company", "companyName companyLogo _id")
      .populate("skills");

    res.status(200).json(jobOffers);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve job offers: ${error.message}` });
  }
};

const deleteJob = async (req, res, next) => {
  const id = req.params.id;
  const ownerId = req.userId;

  let job;
  try {
    job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.company) {
      const company = await Company.findById(job.company);
      await company.jobs.pull(job);
      await company.save();
      await Job.findByIdAndDelete(id);
    } else {
      const user = await User.findById(job.owner._id);
      await user.jobs.pull(id);
      await user.save();
      await Job.findByIdAndDelete(id);
    }
    return res.status(200).json({ message: "Job Successfully Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable To Delete Job" });
  }
};

//// get compnay jobs
const getByUserId = async (req, res, next) => {
  const companyId = req.params.id;
  let companyJobs;
  try {
    companyJobs = await Company.findById(companyId).populate("jobs"); //in populte you use the Ref in user.model
  } catch (err) {
    return console.log(err);
  }
  if (!companyJobs) {
    return res.status(404).json({ message: "No Job Found" });
  }
  return res.status(200).json({ company: companyJobs });
};
////
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).exec();

    if (!job) return res.status(400).json("Job not found");

    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.status(400).json("User not found");

    // Check if user has already applied
    if (job.appliers.includes(req.params.userId))
      return res.status(400).json("You have already applied for this job");

    // Check if user has already been accepted
    if (job.acceptedAppliers.includes(req.params.userId))
      return res
        .status(400)
        .json("You have already been accepted for this job");

    job.appliers.push(req.params.userId);
    user.jobs.push(job);
    await job.save();
    await user.save();

    // add notification to company
    const company = await Company.findById(job.company).exec();
    let notification = new notificationModel({
      type: "applied for a job",
      message: `Applied for your job of : ${job.title}`,
      job: job._id,
      user: user._id,
      createdAt: new Date(),
    });
    notification.save();
    //use socket io to send notification to company
    notification = await notification.populate(
      "user",
      "firstname lastname picturePath _id"
    );
    main.sendNotification(company.user.toString(), notification);
    company.notificationsCompany.push(notification._id);
    await company.save();
    return res.status(200).json("Applied successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const unapplyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).exec();
    if (!job) return res.status(400).json("Job not found");

    // Check if user has applied
    const applierIndex = job.appliers.indexOf(req.params.userId);
    if (applierIndex === -1)
      return res.status(400).json("You have not applied for this job");

    // Remove user from appliers array
    job.appliers.splice(applierIndex, 1);

    // Remove user from acceptedAppliers array if they were accepted
    const acceptedApplierIndex = job.acceptedAppliers.indexOf(
      req.params.userId
    );
    if (acceptedApplierIndex !== -1) {
      job.acceptedAppliers.splice(acceptedApplierIndex, 1);
    }

    await job.save();
    return res.status(200).json("Unapplied successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAppliers = async (req, res) => {
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 1);

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(currentTime.getHours() - 24);

  try {
    const job = await Job.findById(req.params.jobId)
      .populate({
        path: "appliers",
        select: "firstname lastname email picturePath jobs",
      })
      .select({ appliers: 1 })
      .lean()
      .exec();

    if (job.appliers.length === 0) return res.status(204).json(job.appliers);
    return res.status(200).json(job.appliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getSortedAppliers = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate("appliers");
    if (job.appliers.length === 0) return res.status(204).json(job.appliers);
    const sortedappliers = await sortappliers(job.appliers);
    return res.status(200).json(sortedappliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const acceptApplier = async (req, res) => {
  const { jobId, userId } = req.params;

  try {
    // Find the job and the user
    const job = await Job.findById(jobId);
    const user = await User.findById(userId);

    // Check if the job and user exist
    if (!job || !user) {
      return res.status(404).json({ message: "Job or user not found" });
    }

    // Check if the user has applied to the job
    if (!job.appliers.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "User has not applied to this job" });
    }

    // Add the user to the acceptedAppliers array of the job
    const dateAccepted = new Date();
    dateAccepted.setHours(dateAccepted.getHours() + 1);

    job.acceptedAppliers.push({ user: user._id, dateAccepted });
    notification = new notificationModel({
      type: "accepted for a job",
      message: `You have been accepted for the job of : ${job.title}`,
      createdAt: new Date(),
    });
    notification.save();
    user.notifications.push(notification._id);
    sendEmail(user.email, "You have been accepted for a Job: " + job.title);

    await user.save();
    await job.save();

    return res
      .status(200)
      .json({ message: "User has been accepted for this job" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getAcceptedAppliers = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).exec();
    if (!job) return res.status(400).json("Job not found");

    const acceptedAppliers = job.acceptedAppliers;

    // create notifications for accepted users
    for (const userId of acceptedAppliers) {
      const user = await User.findById(userId).exec();
    }

    return res.status(200).json(acceptedAppliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getByUserId,
  acceptApplier,
  getAppliers,
  unapplyJob,
  applyJob,
  getAcceptedAppliers,
  getSortedAppliers,
  geJobById,
};
