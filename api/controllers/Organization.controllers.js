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

const updateOrganization = async (req, res) => {
  const { organizationId } = req.params;
  const updateData = req.body;

  try {

    const updatedOrganization = await Organization.findByIdAndUpdate(
        organizationId,
        updateData,
        { new: true, runValidators: true }
    );

    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json({ message: "Organization updated successfully", organization: updatedOrganization });
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
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

    res.status(200).json({ organizations, organizationCount: totalCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const organization = await Organization.findById(organizationId).populate({
      path: 'organizationMembers.userId',
      select: 'firstname lastname picturePath _id',
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
console.log('org', organization)
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
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    console.log('user', organization.user);

    const user = await userModel.findById(organization.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove organization from user's list
    user.organizations = user.organizations.filter(
        (organizationId) => organizationId.toString() !== req.params.id
    );
    await user.save();

    // Find and delete all invitations related to the organization
    const invitations = await Invitation.find({ organization: req.params.id });
    const invitationIds = invitations.map(invite => invite._id);

    await Invitation.deleteMany({ organization: req.params.id });

    // Find and delete all notifications related to these invitations
    await notificationModel.deleteMany({ invitation: { $in: invitationIds } });

    // Delete the organization
    await Organization.findOneAndDelete({ _id: req.params.id });

    console.log("Organization, related invitations, and notifications have been deleted");
    res.status(200).send("Organization has been deleted");
  } catch (err) {
    console.error("Error deleting organization:", err);
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
  const { organizationId, userId, email, roleName } = req.body;

  try {
    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const role = await roleModel.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: `Role not found: ${roleName}` });
    }

    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        const isMember = organization.organizationMembers.some(member => member.userId.toString() === existingUser._id.toString());
        const isOwner = organization.user.toString() === existingUser._id.toString();

        if (isMember || isOwner) {
          return res.status(400).json({ message: "User is already a member or owner of this organization" });
        }
        const newInvitation = new Invitation({
          organization: organizationId,
          user: existingUser._id,
          role: role.name
        });
        await newInvitation.save();

        const notification = new notificationModel({
          type: 'invitation',
          message: `You have been invited to join ${organization.organizationName} as a ${role.name}`,
          picture: "https://icones.pro/wp-content/uploads/2021/04/icone-cloche-notification-verte.png",
          user: existingUser._id,
          invitation: newInvitation._id
        });
        await notification.save();

        return res.status(201).json({ message: "User invitation sent successfully", invitation: newInvitation });
      } else {

        const existingInvitation = await Invitation.findOne({ organization: organizationId, email });
        if (existingInvitation) {
          return res.status(400).json({ message: "Email has already been invited to this organization" });
        }


        const newInvitation = new Invitation({
          organization: organizationId,
          email,
          role: role.name
        });


        try {
          const message = `
            You have been invited to join ${organization.organizationName} as a ${role.name}. Please click the link below to sign up and accept the invitation.
            "http://localhost:3006/register" Join ${organization.organizationName}
          `;
          await sendEmail(email, message);


          await newInvitation.save();

          return res.status(201).json({ message: "Email invitation sent successfully", invitation: newInvitation });
        } catch (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Failed to send email", error: error.message });
        }
      }
    } else if (userId) {

      const isMember = organization.organizationMembers.some(member => member.userId.toString() === userId);
      const isOwner = organization.user.toString() === userId;

      if (isMember || isOwner) {
        return res.status(400).json({ message: "User is already a member or owner of this organization" });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).json({ message: `User not found: ${userId}` });
      }


      const existingInvitation = await Invitation.findOne({ organization: organizationId, user: userId });
      if (existingInvitation) {
        return res.status(400).json({ message: "User has already been invited to this organization" });
      }


      const newInvitation = new Invitation({
        organization: organizationId,
        user: userId,
        role: role.name
      });
      await newInvitation.save();


      const notification = new notificationModel({
        type: 'invitation',
        message: `You have been invited to join ${organization.organizationName} as a ${role.name}`,
        picture: "https://icones.pro/wp-content/uploads/2021/04/icone-cloche-notification-verte.png",
        user: userId,
        invitation: newInvitation._id
      });
      await notification.save();

      return res.status(201).json({ message: "User invitation sent successfully", invitation: newInvitation });
    } else {
      return res.status(400).json({ message: "User ID or email must be provided" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};



const getInvitationById = async (req, res) => {
  try {
    const { id } = req.params;
console.log('id', id)
    const invitation = await Invitation.findById(id);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    res.status(200).json(invitation);
  } catch (error) {
    console.error("Error fetching invitation:", error);
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
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Update organizationMembers in Organization
    organization.organizationMembers.push({ userId: invitation.user, roleName: invitation.role });
    await organization.save();

    const user = await userModel.findById(invitation.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if organization is already in user's organizations array
    if (!user.organizations.includes(invitation.organization)) {
      user.organizations.push(invitation.organization);
      await user.save(); // Save user after modifying organizations array
    }

    const organizationOwner = await userModel.findOne({ _id: organization.user });
    if (organizationOwner) {
      const notification = new notificationModel({
        type: 'invitation_accepted',
        message: `${user.firstname} ${user.lastname} accepted the invitation to join ${organization.organizationName} as a ${invitation.role}`,
        picture: "https://icones.pro/wp-content/uploads/2021/04/icone-cloche-notification-verte.png",
        organization: organization._id,
      });
      await notification.save();

      organization.notificationsOrganization.push(notification._id);
      await organization.save();

    }

    // Delete original invitation notification
    await notificationModel.deleteOne({ invitation: invitation._id });


    invitation.status = 'accepted';
    await invitation.save();

    res.status(200).json({ message: "Invitation accepted", organization });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const getCurrentOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params; // Assuming organization ID is passed as a URL parameter
    const organization = await Organization.findById(organizationId).populate({
      path: 'organizationMembers.userId',
      select: 'firstname lastname picturePath _id',
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (err) {
    console.error("Error fetching organization:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const seeOrganizationNotification = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const organization = await Organization.findById(organizationId).select("notificationsOrganization");

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const unseenNotifications = await notificationModel.find({
      seen: false,
      organization: organizationId,
    });
    for (const notification of unseenNotifications) {
      notification.seen = true;
      await notification.save();
    }

    res.status(200).json({ message: "Organization notifications seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrganizationNotifications = async (req, res) => {
  try {
    const { organizationId } = req.params;
    console.log('id', organizationId)
    const organization = await Organization.findById(organizationId);
    if (!organization) throw new Error("Organization not found");

    let notifications = await notificationModel
        .find({ organization: organizationId })
        .populate("job")
        .populate("challenge")
        .sort({ createdAt: -1 });

    const countNotSeenNotifications = await notificationModel.countDocuments({
      organization: organizationId,
      seen: false,
    });

    res.status(200).json({ notifications, countNotSeenNotifications });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateMemberRole = async (req, res) => {
  const { organizationId, memberId } = req.params;
  const { role } = req.body;
  try {
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }


    const member = organization.organizationMembers.find(
        (member) => member.userId.toString() === memberId
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.roleName = role;

    await organization.save();

    res.status(200).json({ message: "Member role updated successfully", organization });
  } catch (error) {
    console.error("Error updating member role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMember = async (req, res) => {
  const { organizationId, memberId } = req.params; // Extract organization ID and member ID from request parameters

  try {

    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const memberIndex = organization.organizationMembers.findIndex(
        (member) => member.userId.toString() === memberId
    );

    if (memberIndex === -1) {
      return res.status(404).json({ message: "Member not found" });
    }


    organization.organizationMembers.splice(memberIndex, 1);


    await organization.save();

    await userModel.findByIdAndUpdate(
        memberId,
        { $pull: { organizations: organizationId } },
        { new: true }
    );

    res.status(200).json({ message: "Member removed successfully", organization });
  } catch (error) {
    console.error("Error removing member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateSocialMediaLinks = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const { socialMediaLinks } = req.body.socialMediaLinks;
    console.log('Received socialMediaLinks:', socialMediaLinks);

    const updateResult = await Organization.findByIdAndUpdate(
        organizationId,
        { $set: { socialMediaLinks } },
        { new: true, runValidators: true }
    );

    if (!updateResult) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(updateResult);
  } catch (error) {
    console.error("Error updating social media links:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  editProfile,
  updateOrganization,
  getOrganization,
  getOrganizationChallenges,
  ChallengeWinner,
  getCompanyNotifications,
  deleteOrganization,
  getAllOrganizations,
  getRecentOrganizations,
  inviteUserToOrganization,
  getInvitationById,
  acceptInvitation,
  getCurrentOrganization,
  getOrganizationNotifications,
  seeOrganizationNotification,
  updateMemberRole,
  deleteMember,
  updateSocialMediaLinks
};
