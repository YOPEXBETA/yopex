const axios = require("axios");
const ChallengeModel = require("../models/Challenge.model");
const ContestConversationModel = require("../models/ContestConversation.model");
const OrganizationModel = require("../models/Organization.model");
const submissionModel = require("../models/submission.model");
const UserModel = require("../models/user.model");
const Skill = require("../models/skill.model");
const Category = require("../models/Category.model");

const CreateChallenge = async (req, res, next) => {
  try {
    const {
      title,
      description,
      categories,
      price,
      organizationId,
      deadline,
      skills,
      nbruser,
      paid,
      youtubeLink,
      objective,
    } = req.body;
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    let owner = user;

    const organization = await OrganizationModel.findById(organizationId);

    if (!organization) {
      return res.status(400).json({ error: "organization not found" });
    }
    if (organizationId) {
      owner = await OrganizationModel.findOne({
        user: user._id,
        _id:  organizationId,
      });

      if (!owner) {
        return res.status(400).json({ error: "Organization not found" });
      }
    }

    if (youtubeLink) {
      // verify youtube link
      const youtubeRegex =
        /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (!youtubeRegex.test(youtubeLink)) {
        return res.status(400).json({ message: "Invalid youtube link" });
      }
    }

    const challenge = new ChallengeModel({
      title,
      description,
      categories,
      deadline,
      price: paid === "true" ? price : 0,
      skills,
      nbruser,
      YoutubeLink: youtubeLink,
      paid: paid === "true" ? true : false,
      verified: paid === "true" ? false : true,
      objective,
    });
    if (organizationId) {
      challenge.organization = owner._id;
      challenge.owner = user._id;
    } else {
      challenge.owner = owner._id;
    }

    await challenge.save();

    const newCoversation = new ContestConversationModel({
      contestId: challenge._id,
    });
    await newCoversation.save();
    if (organizationId) {
      owner.challenges.push(challenge._id);
      await owner.save();
    } else {
      owner.createdChallenge.push(challenge._id);
      await owner.save();
    }
    if (paid === "true") {
      const url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/api/payment"
          : "https://yopexhub.com/api/payment";
      const response = await axios.post(
        url,
        {
          amount: price * 1000,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          challengeId: challenge._id,
        },
        {
          headers: {
            Authorization: "token " + req.token,
          },
        }
      );
      return res.status(200).json(response.data.payUrl);
    }
    res
      .status(201)
      .json({ message: "Challenge created successfully", challenge });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Failed to create challenge: ${error.message}` });
  }
};

const CreateOrganizationChallenge = async (req, res, next) => {
  try {
    const {
      title,
      description,
      categories,
      price,
      deadline,
      skills,
      nbruser,
      paid,
      youtubeLink,
      objective,
      organizationId, // Extract this from the body
      userId,
    } = req.body;


    // Verify the organization
    const organization = await OrganizationModel.findById(organizationId);
    if (!organization) {
      return res.status(400).json({ error: "Organization not found" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Verify YouTube link if provided
    if (youtubeLink) {
      const youtubeRegex =
          /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      if (!youtubeRegex.test(youtubeLink)) {
        return res.status(400).json({ message: "Invalid YouTube link" });
      }
    }

    // Create the challenge
    const challenge = new ChallengeModel({
      title,
      description,
      categories,
      deadline,
      price: paid === "true" ? price : 0,
      skills,
      nbruser,
      YoutubeLink: youtubeLink,
      paid: paid === "true" ? true : false,
      verified: paid === "true" ? false : true,
      objective,
      organization: organization._id,
      owner: userId,
    });

    await challenge.save();

    // Add challenge to the organization's challenges
    organization.challenges.push(challenge._id);
    await organization.save();

    // Create a new conversation for the challenge
    const newConversation = new ContestConversationModel({
      contestId: challenge._id,
    });
    await newConversation.save();

    // Handle payment if the challenge is paid
    if (paid === "true") {
      const url =
          process.env.NODE_ENV === "development"
              ? "http://localhost:8000/api/payment"
              : "https://yopexhub.com/api/payment";

      const response = await axios.post(
          url,
          {
            amount: price * 1000,
            firstName: req.user.firstname,
            lastName: req.user.lastname,
            email: req.user.email,
            challengeId: challenge._id,
          },
          {
            headers: {
              Authorization: "token " + req.token,
            },
          }
      );

      return res.status(200).json(response.data.payUrl);
    }

    res.status(201).json({ message: "Challenge created successfully", challenge });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Failed to create challenge: ${error.message}` });
  }
};

const getChallengeById = async (req, res) => {
  const challengeId = req.params.challengeId; // Assuming you're passing the challenge ID as a URL parameter

  try {
    const challenge = await ChallengeModel.findById(challengeId)
      .populate("organization")
      .populate("owner", "firstname lastname picturePath _id")
      .populate("skills", "name _id")
        .populate("categories", "name _id")
        .populate({
        path: "banned",
        select: "firstname lastname picturePath _id",
      })
      .populate({
        path: "users",
        populate: {
          path: "user",
          select: "picturePath firstname lastname",
        },
      });
    const ChallengeUsers = challenge.users.sort((a, b) => {
      return b.star - a.star;
    });
    challenge.users = ChallengeUsers;

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ...

const deleteChallenge = async (req, res) => {
  try {
    const challenge = await ChallengeModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (challenge.company) {
      const company = await OrganizationModel.findOne({ _id: challenge.company });
      await company.challenges.pull(challenge._id);
      await company.save();
    } else {
      const User = await UserModel.findOne({ _id: challenge.owner });
      await User.createdChallenge.pull(challenge._id);
      await User.save();
    }
    const message = "challenge has been deleted";

    res.status(200).send({ challenge, message });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrganizationChallenges = async (req, res) => {
  const q = req.query;
  const organizationId = req.params.organizationId;
  const filters = {
    organization: organizationId,
    verified: true,
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: parseFloat(q.min) }),
        ...(q.max && { $lte: parseFloat(q.max) }),
      },
    }),
    ...(q.categories && {
      categories: {
        $in: (await Category.find({ name: { $in: q.categories.split(",") } })).map(
            (category) => category._id
        ),
      },
    }),
    ...(q.skills && {
      skills: {
        $in: (await Skill.find({ name: { $in: q.skills.split(",") } })).map(
            (skill) => skill._id
        ),
      },
    }),
  };

  try {
    const challenges = await ChallengeModel.find(filters)
        .populate("organization")
        .populate("skills")
        .populate("categories");

    res.status(200).json(challenges);
  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve challenges: ${err.message}` });
  }
};


const getAllChallenges = async (req, res) => {
  const q = req.query;

  const filters = {
    verified: true,
    ...(q.userId && { userId: q.userId }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),

    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.categories && {
      categories: {
        $in: (await Category.find({ name: { $in: q.categories } })).map(
          (category) => category._id
        ),
      },
    }),
    ...(q.skills && {
      skills: {
        $in: (await Skill.find({ name: { $in: q.skills } })).map(
          (skill) => skill._id
        ),
      },
    }),
  };

  try {
    const ChallengePosts = await ChallengeModel.find(filters)
      .populate("organization")
      .populate("skills")
      .populate("categories");

    res.status(200).json(ChallengePosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChallengeUsers = async (req, res) => {
  try {
    const idChallenge = req.query.idChallenge; // Get idChallenge from the query parameter
    const ChallengePost = await ChallengeModel.findById(idChallenge).populate({
      path: "users",
      populate: {
        path: "user",
        select: "picturePath firstname lastname",
      },
    });
    // sort users with star
    const ChallengeUsers = ChallengePost.users.sort((a, b) => {
      return b.star - a.star;
    });
    res.status(200).json(ChallengeUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChallengeUserSubmit = async (req, res) => {
  try {
    const challengeId = req.query.challengeId; // Get idChallenge from the query parameter
    const challenge = await ChallengeModel.findById(challengeId);
    const userId = req.query.userId; // Get idUser from the query parameter

    /* if (req.userId !== userId && req.userId !== challenge.owner.toString()) {
      return res.status(400).json({ message: "Not authorized" });
    }*/

    const submit = await submissionModel.findOne({
      challengeId: challengeId,
      userId: userId,
    });

    res.status(200).json(submit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateChallenge = async (req, res, next) => {
  const { description, title, nbruser, price, categories, skills } = req.body;
  const challengeId = req.params.challengeId;

  let Challenge;
  try {
    Challenge = await ChallengeModel.findByIdAndUpdate(challengeId, {
      title,
      description,
      nbruser,
      price,
      categories: categories.map((cat) => cat.value),
      skills: skills.map((skill) => skill.value),
    });
    res.status(200).json({ Challenge });
  } catch (err) {
    return console.log(err);
  }
};

const startChallenge = async (req, res, next) => {
  try {
    const challengeId = req.params.challengeId;
    const challenge = await ChallengeModel.findById(challengeId);
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (
      challenge.owner?.toString() !== userId.toString() &&
      !user.organizations.includes(challenge.organization.toString())
    ) {
      return res.status(400).json({ message: "Not authorized" });
    }
    if (challenge.users.length === 0) {
      return res.status(400).json({ message: "No users registered" });
    }
    challenge.start = true;
    challenge.deadline = req.body.deadline;
    await challenge.save();
    res.status(200).json({ message: "Challenge started" });
  } catch (err) {
    res.status(400).json({ message: "bad" });
    return console.log(err);
  }
};

const banUser = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    const { userId } = req.body;
    const owner = req.userId;
    const user = await UserModel.findById(owner);
    const challenge = await ChallengeModel.findById(challengeId);
    if (
      challenge.owner?.toString() !== owner.toString() &&
      !user.companies.includes(challenge.company.toString())
    ) {
      return res.status(400).json({ message: "Not authorized" });
    }
    challenge.banned.push(userId);
    challenge.users = challenge.users.filter(
      (user) => user.user.toString() !== userId.toString()
    );
    await challenge.save();
    const userBanned = await UserModel.findById(userId);
    userBanned.challenges = userBanned.challenges.filter(
      (challenge) => challenge.toString() !== challengeId.toString()
    );
    await userBanned.save();
    res.status(200).json({ message: "User banned" });
  } catch (err) {
    res.status(400).json({ message: "bad" });
    return console.log(err);
  }
};

const unBanUser = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    const { userId } = req.body;
    const owner = req.userId;
    const user = await UserModel.findById(owner);
    const challenge = await ChallengeModel.findById(challengeId);
    if (
      challenge.owner?.toString() !== owner.toString() &&
      !user.companies.includes(challenge.company.toString())
    ) {
      return res.status(400).json({ message: "Not authorized" });
    }
    challenge.banned = challenge.banned.filter(
      (user) => user.toString() !== userId
    );
    challenge.users.push({
      user: userId,
      registrationDate: Date.now(),
    });
    await challenge.save();
    const userBanned = await UserModel.findById(userId);
    userBanned.challenges.push(challengeId);
    await userBanned.save();
    res.status(200).json({ message: "User banned" });
  } catch (err) {
    res.status(400).json({ message: "bad" });
    return console.log(err);
  }
};

const getChallengeSubmission = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    const challenge = await ChallengeModel.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (challenge.start === true && challenge.deadline < Date.now()) {
      const submission = await submissionModel
        .find({
          challengeId: challengeId,
        })
        .populate("userId", "firstname lastname picturePath _id");
      return res.status(200).json(submission);
    }
    if (
      challenge.owner?.toString() !== userId.toString() &&
      !user.organizations.includes(challenge.organization?.toString())
    ) {
      const submission = await submissionModel
        .find({
          challengeId: challengeId,
          userId: userId,
        })
        .populate("userId", "firstname lastname picturePath _id");
      return res.status(200).json(submission);
    } else {
      const submission = await submissionModel
        .find({
          challengeId: challengeId,
        })
        .populate("userId", "firstname lastname picturePath _id");
      return res.status(200).json(submission);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  CreateChallenge,
  deleteChallenge,
  getChallengeById,
  getOrganizationChallenges,
  getAllChallenges,
  getChallengeUsers,
  getChallengeUserSubmit,
  updateChallenge,
  startChallenge,
  banUser,
  unBanUser,
  getChallengeSubmission,
  CreateOrganizationChallenge
};
