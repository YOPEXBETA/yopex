const express = require("express");
const TeamRouter = express.Router();
const { createTeam, inviteUserToTeam, refuseInvitation, acceptInvitation, getTeamInvitationById, getTeamById,
    removeTeamMember, leaveTeam
} = require("../controllers/Team.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");

TeamRouter.post("/create",authenticateToken, createTeam);
TeamRouter.post('/invite',authenticateToken, inviteUserToTeam);
TeamRouter.put('/acceptInvite/:invitationId',authenticateToken, acceptInvitation);
TeamRouter.put('/refuseInvite/:invitationId',authenticateToken, refuseInvitation);
TeamRouter.get('/getInviteById/:invitationId',authenticateToken, getTeamInvitationById);
TeamRouter.get('/getTeamById/:teamId',authenticateToken, getTeamById);
TeamRouter.delete('/removeMember',authenticateToken, removeTeamMember);
TeamRouter.delete('/leaveTeam',authenticateToken, leaveTeam);


module.exports = TeamRouter;
