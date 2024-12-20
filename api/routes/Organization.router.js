const express = require("express");

const organizationRouter = express.Router();

//imported controllers
const { approveCompany } = require("../controllers/admin.controllers");
const {
  editProfile,
  ChallengeWinner,
  getCompanyNotifications,
  deleteOrganization,
  getAllOrganizations,
  getRecentOrganizations,
  inviteUserToOrganization,
  acceptInvitation, getInvitationById, getCurrentOrganization, getOrganizationNotifications, seeOrganizationNotification,
  updateMemberRole, deleteMember, updateOrganization, updateSocialMediaLinks, getUserRoleInOrganization,
  refuseInvitation
} = require("../controllers/Organization.controllers");
const { getOrganization } = require("../controllers/Organization.controllers");

const validate = require("../middlewares/SchemaValidation.middleware");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const {
  companyEditProfileValidator,
} = require("../validators/company.auth.validators");
const {getUserNotifications} = require("../controllers/user.controllers");
organizationRouter.post("/challengeWinner", authenticateToken, ChallengeWinner);

organizationRouter.put("/approve/:id/", authenticateToken, approveCompany);
organizationRouter.put;
organizationRouter.put("/:id/", authenticateToken, editProfile);
organizationRouter.get("/get/:organizationId", authenticateToken, getOrganization);
organizationRouter.get("/getAllOrganizations", getAllOrganizations);
organizationRouter.get(
  "/company/:userId/notifications",
  authenticateToken,
  getCompanyNotifications
);
organizationRouter.delete("/:id", authenticateToken, deleteOrganization);
organizationRouter.get("/notifications/:organizationId", authenticateToken, getOrganizationNotifications);
organizationRouter.put("/update/:organizationId",authenticateToken, updateOrganization);
organizationRouter.put('/notifications/see/:organizationId', authenticateToken, seeOrganizationNotification);

organizationRouter.get("/Recentcompanies", getRecentOrganizations);
organizationRouter.post('/invite', inviteUserToOrganization);
organizationRouter.get('/getInvitationById/:id',authenticateToken, getInvitationById);
organizationRouter.post('/accept-invitation/:invitationId', authenticateToken , acceptInvitation);
organizationRouter.delete('/refuse-invitation/:invitationId', authenticateToken , refuseInvitation);
organizationRouter.get("/getCurrentOrganization/:organizationId", authenticateToken, getCurrentOrganization);
organizationRouter.put('/update-social-links/:organizationId', authenticateToken , updateSocialMediaLinks);
organizationRouter.put("/:organizationId/:memberId", authenticateToken , updateMemberRole);
organizationRouter.delete("/:organizationId/:memberId", authenticateToken , deleteMember);
organizationRouter.get('/getUserRoleInOrganization/:organizationId/:userId', authenticateToken , getUserRoleInOrganization);

module.exports = organizationRouter;
