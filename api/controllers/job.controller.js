const mongoose = require("mongoose");
const User = require("../models/user.model");
const Job = require("../models/job.model");
const Company = require("../models/company.model");

const { sendEmail } = require("../middlewares/mail.middleware");
const { sortappliers } = require("../tensorflow/anotherz");
const notificationModel = require("../models/notification.model");
const main = require("../server");

// companyRoutes.js

const addJob = async (req, res, next) => {
  try {
    const { title,category,RecommendedSkills, description, companyId , salary} = req.body;

    const userId = req.userId;
    const user = await User.findById(userId);

    const company = await Company.findOne({ user: user._id, _id: companyId });

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    if (company.verified === false) {
      return res.status(400).json({ message: "Company not verified" });
    }

    const jobOffer = new Job({
      company: company._id,
      title,
      description,
      category,
      RecommendedSkills,
      salary,
    });

    await jobOffer.save();

    company.jobs.push(jobOffer._id);
    await company.save();

    res
      .status(201)
      .json({ message: "Job offer created successfully", jobOffer });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create job offer: ${error.message}` });
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("company");

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching jobs." });
  }
};

const updateJob = async (req, res, next) => {
  const { title, description ,salary , category ,RecommendedSkills} = req.body;
  const jobId = req.params.id;
  let job;
  try {
    job = await Job.findByIdAndUpdate(jobId, {
      title,
      description,
      salary,
      category,
      RecommendedSkills,
    });
     res.status(200).json({ job });
  } catch (err) {
    return console.log(err);
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
    const jobOffers = await Job.find({ company: companyId }).populate(
      "company"
    );

    res.status(200).json(jobOffers);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve job offers: ${error.message}` });
  }
};

const deleteJob = async (req, res, next) => {
  
  const id = req.params.id;

  let job;
  try {
    job = await Job.findById(id);
    const company = await Company.findById(job.company);
    await company.jobs.pull(job);
    await company.save();
    await Job.findByIdAndDelete(id);
    return res.status(200).json({ message: "Successfully Delete" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable To Delete" });

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
    user.jobs.push (job);
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
    notification = await notification.populate("user", "firstname lastname picturePath _id");
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
  try {
    const job = await Job.findById(req.params.jobId)
      .populate({ path: "appliers", select: "firstname lastname email picturePath jobs" })
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
    job.acceptedAppliers.push(user._id);
    notification = new notificationModel({
      type: "accepted for a job",
      message: `You have been accepted for the job of : ${job.title}`,
      createdAt: new Date(),
    });
    notification.save();
    user.notifications.push(notification._id);
    sendEmail(user.email, "You have been accepted for a Job: ");
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
