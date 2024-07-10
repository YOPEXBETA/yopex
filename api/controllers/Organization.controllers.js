const userSchema = require("../models/user.model");
const companySchema = require("../models/Organization.model");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const ChallengeModel = require("../models/Challenge.model");
const Organization = require("../models/Organization.model");
const userModel = require("../models/user.model");
const roleModel = require("../models/OrganizationRoles.model");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../middlewares/mail.middleware");
const { updateUserChallengesBadges } = require("../utils/utilities");
const notificationModel = require("../models/notification.model");
const main = require("../server");
const ReviewModel = require("../models/Review.model");
const { response } = require("express");
const Invitation = require('../models/organizationInvitations.model');


const editProfile = async (req, res) => {
  try {
    const updateFields = req.body;

    const updatedOrganization = await Organization
      .findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .select("-password");

    res.status(200).json(updatedOrganization);
  } catch (error) {
    console.error("Error in editProfile:", error);
    return res.status(500).json(error);
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;

    let organizationQuery = {};
    if (req.query.name) {
      const searchRegex = new RegExp(req.query.name, "i");
      organizationQuery = { organizationName: { $regex: searchRegex } };
    }

    const organizations = await Organization
      .find(organizationQuery)
      .select(
        "_id organizationName organizationLogo country address challenges jobs verified"
      )
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();

    const totalCount = await Organization.countDocuments(organizationQuery);

    res.status(200).json({ organizations, companyCount: totalCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrganizationChallenges = async (req, res) => {
  try {
    const idCompany = req.query.idCompany; // Get idChallenge from the query parameter
    const organization = await Organization.findById(idCompany).populate({
      path: "challenges",
      select: "-password",
    });
    res.status(200).json(organization);
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

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    const user = await userModel.findById(organization.user);
    user.companies = user.companies.filter(
      (companyId) => companyId.toString() !== req.params.id
    );
    await user.save();
    await Organization.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("Organization has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRecentOrganizations = async (req, res) => {
  try {
    const organizations = await Organization
      .find()
      .select("_id organizationName organizationLogo")
      .sort({ createdAt: -1 });

    res.status(200).json(organizations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const inviteUserToOrganization = async (req, res) => {
  const { organizationId, userId, roleName } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: `User not found: ${userId}` });
    }

    const role = await roleModel.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: `Role not found: ${roleName}` });
    }

    const newInvitation = new Invitation({ organization: organizationId, user: userId, role: role.name });
    await newInvitation.save();

    res.status(201).json({ message: "Invitation sent successfully", invitation: newInvitation });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const acceptInvitation = async (req, res) => {
  const { invitationId } = req.params;

  try {

    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    if (invitation.status !== 'pending') {
      return res.status(400).json({ message: "Invitation is not pending" });
    }


    const organization = await Organization.findById(invitation.organization);
    organization.organizationMembers.push({ userId: invitation.user, role: invitation.role });
    await organization.save();


    invitation.status = 'accepted';
    await invitation.save();

    res.status(200).json({ message: "Invitation accepted", organization });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  editProfile,
  getOrganization,
  getOrganizationChallenges,
  ChallengeWinner,
  getCompanyNotifications,
  deleteOrganization,
  getAllOrganizations,
  getRecentOrganizations,
  inviteUserToOrganization,
  acceptInvitation
};
