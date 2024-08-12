const express = require("express");
const TeamRouter = express.Router();
const { createTeam, inviteUserToTeam} = require("../controllers/Team.controller");

// Route to add a new team
TeamRouter.post("/create", createTeam);
TeamRouter.post('/invite', inviteUserToTeam);

module.exports = TeamRouter;
