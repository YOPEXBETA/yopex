const ChallengeModel = require("../models/Challenge.model");
const ContestConversationModel = require("../models/ContestConversation.model");
const CompanyModel = require("../models/company.model");
const submissionModel = require("../models/submission.model");
const UserModel = require("../models/user.model");

const CreateChallenge = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      price,
      companyId,
      deadline,
      RecommendedSkills,
      nbruser,
      paid,
    } = req.body;
    console.log(req.body);

    const userId = req.userId;
    const user = await UserModel.findById(userId);
    let owner = user;
    if (companyId) {
      owner = await CompanyModel.findOne({
        user: user._id,
        _id: companyId,
      });

      if (!owner) {
        return res.status(400).json({ error: "Company not found" });
      }
      if (owner.verified === false) {
        return res.status(400).json({ message: "Company not verified" });
      }
    }

    const challenge = new ChallengeModel({
      title,
      description,
      category,
      deadline,
      price: paid === "true" ? price : 0,
      RecommendedSkills,
      nbruser,
      paid: paid === "true" ? true : false,
    });
    if (companyId) {
      challenge.company = owner._id;
    } else {
      challenge.owner = owner._id;
    }

    await challenge.save();

    const newCoversation = new ContestConversationModel({
      contestId: challenge._id,
    });
    await newCoversation.save();
    if (companyId) {
      owner.challenges.push(challenge._id);
      await owner.save();
    } else {
      owner.createdChallenge.push(challenge._id);
      await owner.save();
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

const getChallengeById = async (req, res) => {
  const challengeId = req.params.challengeId; // Assuming you're passing the challenge ID as a URL parameter

  try {
    const challenge = await ChallengeModel.findById(challengeId)
      .populate("company")
      .populate("owner", "firstname lastname picturePath _id")
      .populate("RecommendedSkills", "name _id")
      .populate({
        path: "users",
        populate: {
          path: "user",
          select: "picturePath firstname lastname",
        },
      });

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
    const company = await CompanyModel.findOne({ _id: challenge.company });
    await company.challenges.pull(challenge._id);
    await company.save();
    const message = "challenge has been deleted";

    res.status(200).send({ challenge, message });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCompanyChallenges = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const company = await CompanyModel.findOne({ _id: companyId });

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const challenges = await ChallengeModel.find({
      company: companyId,
    }).populate("company");

    res.status(200).json(challenges);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve challenges: ${error.message}` });
  }
};

const getAllChallenges = async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.category && { category: q.category }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.skills && { RecommendedSkills: { $in: q.skills } }),
    ...(q.categories && { category: { $in: q.categories } }),
  };

  try {
    const ChallengePosts =
      await ChallengeModel.find(filters).populate("company");

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
      select: "-password",
    });
    const ChallengeUsers = ChallengePost.users;
    res.status(200).json(ChallengeUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChallengeUserSubmit = async (req, res) => {
  try {
    const challengeId = req.query.challengeId; // Get idChallenge from the query parameter
    const userId = req.query.userId; // Get idUser from the query parameter

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
  const { description, title, nbruser, price, category, RecommendedSkills } =
    req.body;
  const challengeId = req.params.challengeId;

  let Challenge;
  try {
    Challenge = await ChallengeModel.findByIdAndUpdate(challengeId, {
      title,
      description,
      nbruser,
      price,
      category,
      RecommendedSkills,
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
      !user.companies.includes(challenge.company.toString())
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
    res.status(200).json({ message: "User banned" });
  } catch (err) {
    res.status(400).json({ message: "bad" });
    return console.log(err);
  }
};

module.exports = {
  CreateChallenge,
  deleteChallenge,
  getChallengeById,
  getCompanyChallenges,
  getAllChallenges,
  getChallengeUsers,
  getChallengeUserSubmit,
  updateChallenge,
  startChallenge,
  banUser,
};
