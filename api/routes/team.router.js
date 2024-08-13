const express = require("express");
const TeamRouter = express.Router();
const { createTeam, inviteUserToTeam, refuseInvitation, acceptInvitation, getTeamInvitationById} = require("../controllers/Team.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");

// Route to add a new team
TeamRouter.post("/create",authenticateToken, createTeam);
TeamRouter.post('/invite',authenticateToken, inviteUserToTeam);
TeamRouter.put('/acceptInvite/:invitationId',authenticateToken, acceptInvitation);
TeamRouter.put('/refuseInvite/:invitationId',authenticateToken, refuseInvitation);
TeamRouter.get('/getInviteById/:invitationId',authenticateToken, getTeamInvitationById);


module.exports = TeamRouter;
