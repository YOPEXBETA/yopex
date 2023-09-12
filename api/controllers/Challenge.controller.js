const ChallengeModel = require("../models/Challenge.model");
const ContestConversationModel = require("../models/ContestConversation.model");
const CompanyModel = require("../models/company.model");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

const CreateChallenge = async (req, res, next) => {
  try {
    
    const { title, description, category, price, companyId, deadline,RecommendedSkills,nbruser,paid } =
      req.body;
    console.log(req.body);
    
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    const company = await CompanyModel.findOne({
      user: user._id,
      _id: companyId,
    });
    console.log("company:", company);

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }
    if (company.verified === false) {
      return res.status(400).json({ message: "Company not verified" });
    }
    const challenge = new ChallengeModel({
      company: company._id,
      title,
      description,
      category,
      deadline,
      price:paid==="true"?price:0,
      RecommendedSkills,
      nbruser,
      paid:paid==="true"?true:false,
    });

    await challenge.save();

    const newCoversation = new ContestConversationModel({
      contestId: challenge._id,
    });
    await newCoversation.save();


    company.challenges.push(challenge._id);
    await company.save();

    res
      .status(201)
      .json({ message: "Challenge created successfully", challenge });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create challenge: ${error.message}` });
  }
};

const getChallengeById = async (req, res) => {
  const challengeId = req.params.challengeId; // Assuming you're passing the challenge ID as a URL parameter

  try {
    const challenge =
      await ChallengeModel.findById(challengeId)
      .populate("company")
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
    console.log(req.params.id);
    const challenge = await ChallengeModel.findOneAndDelete({_id:req.params.id});

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
  console.log(q.categories);
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
    
    

    const Challenge = await ChallengeModel.findById(challengeId).populate({
      path: "submissions",
    });
    const ChallengeUserSubmit = Challenge.submissions.filter(
      (submission) => submission.userId == userId,
    );

    res.status(200).json(ChallengeUserSubmit);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
};
