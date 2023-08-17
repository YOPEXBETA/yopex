const userSchema = require("../models/user.model");
const companySchema = require("../models/company.model");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const ChallengeModel = require("../models/Challenge.model");
const Company = require("../models/company.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middlewares/mail.middleware");
const { updateUserChallengesBadges } = require("../utils/utilities");

const editProfile = async (req, res) => {
  try {
    console.log("editProfile");

    const updateFields = pick(req.body, [
      "companyName",
      "email",
      "password",
      "picturePath",
      "country",
      "dateoffoundation",
      "phoneNumber",
    ]);

    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(updateFields.password, salt);
      updateFields.password = hashedPass;
    }
    const updatedCompany = await companySchema
      .findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .select("-password");

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/*const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await companySchema.findById(id).populate("challenges");
    res.status(200).json(company);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};*/

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
    const idCompany = req.body.idCompany; // Get idChallenge from the query parameter
    const idChallenge = req.body.idChallenge; // Get idChallenge from the query parameter
    const idUser = req.body.idUser; // Get idUser from the query parameter
    const Challenge = await ChallengeModel.findById(idChallenge);
    const company = await Company.findById(idCompany).select("-password");
    const User = await userModel.findById(idUser);
    console.log(Challenge);

    // get Admin account
    const AdminUser = await userModel.findOne({ role: "admin" });
    User.balance = User.balance + Challenge.price * 0.9;
    AdminUser.balance = AdminUser.balance + Challenge.price * 0.1;

    company.balance = company.balance - Challenge.price;
    Challenge.winner = User._id;
    User.challengesWon = (User.challengesWon ? User.challengesWon : 0) + 1;

    updateUserChallengesBadges(User);
    console.log("passed the badges challenges");
    User.score += 100;

    User.notifications.push({
      message: `You won the challenge ${Challenge.title}`,
    });
    sendEmail(User.email, `You won the challenge ${Challenge.title}`);
    newChallenge = await Challenge.save();
    User.save();
    AdminUser.save();
    newCompany = await company.save();
    console.log(newCompany);
    res.status(200).json({ newCompany, newChallenge });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getCompanyNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    const companies = user.companies;
    let notification = [];
    for (const companyId of companies) {
      const company = await companySchema
        .findById(companyId)
        .populate({
          path: "notificationsCompany",
          match: { seen: false },
          populate: {
            path: "user",
            select: "firstname lastname picturePath",
          },
        });

      notification = notification.concat(company.notificationsCompany);
    }
    
    res.status(200).json(notification);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = {
  editProfile,
  getCompany,
  getCompanyChallenges,
  ChallengeWinner,
  getCompanyNotifications,
};
