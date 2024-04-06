const userSchema = require("../models/user.model");
const companySchema = require("../models/company.model");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const ChallengeModel = require("../models/Challenge.model");
const Company = require("../models/company.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../middlewares/mail.middleware");
const { updateUserChallengesBadges } = require("../utils/utilities");
const notificationModel = require("../models/notification.model");
const main = require("../server");
const ReviewModel = require("../models/Review.model");
const { response } = require("express");
const editProfile = async (req, res) => {
  try {
    const updateFields = req.body;

    const updatedCompany = await companySchema
      .findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .select("-password");

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error in editProfile:", error);
    return res.status(500).json(error);
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;

    let companyQuery = {};
    if (req.query.name) {
      const searchRegex = new RegExp(req.query.name, "i");
      companyQuery = { companyName: { $regex: searchRegex } };
    }

    const companies = await companySchema
      .find(companyQuery)
      .select("_id companyName companyLogo country address challenges jobs")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();

    const totalCount = await companySchema.countDocuments(companyQuery);

    res.status(200).json({ companies, companyCount: totalCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await companySchema.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCompanyChallenges = async (req, res) => {
  try {
    const idCompany = req.query.idCompany; // Get idChallenge from the query parameter
    const Company = await CompanyModel.findById(idCompany).populate({
      path: "challenges",
      select: "-password",
    });
    res.status(200).json(Company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const ChallengeWinner = async (req, res) => {
  try {
    const idChallenge = req.body.idChallenge; // Get idChallenge from the query parameter
    const idUser = req.body.idUser; // Get idUser from the query parameter
    const Challenge = await ChallengeModel.findById(idChallenge);
    const owner = req.userId;
    const requestOwner = await userModel.findById(owner);
    if (
      Challenge.owner?.toString() !== owner.toString() &&
      !requestOwner.companies.includes(Challenge.company.toString())
    ) {
      return res.status(400).json({ message: "Not authorized" });
    }
    const User = await userModel.findById(idUser);
    const review = await ReviewModel.findOne({
      challengeId: idChallenge,
      userId: idUser,
    });
    if (!review) {
      return res.status(404).json({
        message:
          "To be able to select this participant as the winner, you should add a review.",
      });
    }
    // get Admin account
    const AdminUser = await userModel.findOne({ role: "admin" });
    User.balance = (User.balance ? User.balance : 0) + Challenge.price * 0.9;
    AdminUser.balance =
      (AdminUser.balance ? AdminUser.balance : 0) + Challenge.price * 0.1;

    Challenge.winner = User._id;
    User.challengesWon = (User.challengesWon ? User.challengesWon : 0) + 1;

    //updateUserChallengesBadges(User);
    console.log("passed the badges challenges");
    User.score += 100;
    const notification = new notificationModel({
      type: "won a challenge",
      message: `You won the challenge ${Challenge.title}`,
      picture:
        "https://icones.pro/wp-content/uploads/2021/04/icone-cloche-notification-verte.png",
      user: User._id,
    });
    notification.save();
    //User.notifications.push(notification._id);
    main.sendNotification(User._id.toString(), notification);
    //sendEmail(User.email, `You won the challenge ${Challenge.title}`);
    const newChallenge = await Challenge.save();
    User.save();
    //console.log(User);
    AdminUser.save();
    res.status(200).json({ newChallenge });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getCompanyNotifications = async (req, res) => {
  // try {
  //   const userId = req.params.userId;
  //   const user = await userModel.findById(userId);
  //   const companies = user.companies;
  //   let notification = [];
  //   for (const companyId of companies) {
  //     const company = await companySchema
  //       .findById(companyId)
  //       .populate({
  //         path: "notificationsCompany",
  //         match: { seen: false },
  //         populate: {
  //           path: "user",
  //           select: "firstname lastname picturePath",
  //         },
  //       });
  //     notification = notification.concat(company.notificationsCompany);
  //   }
  //   res.status(200).json(notification);
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).json({ error: "Server Error" });
  // }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    const user = await userModel.findById(company.user);
    user.companies = user.companies.filter(
      (companyId) => companyId.toString() !== req.params.id
    );
    await user.save();
    await Company.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("Company has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  editProfile,
  getCompany,
  getCompanyChallenges,
  ChallengeWinner,
  getCompanyNotifications,
  deleteCompany,
  getAllCompanies,
};
