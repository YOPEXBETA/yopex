const express = require("express");
const TeamChallengeRouter = express.Router();
const {
    CreateTeamChallenge,
    getTeamChallengeById,
    getAllTeamChallenges,
    updateTeamChallenge,
    deleteTeamChallenge,
} = require("../controllers/teamChallenge.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");


TeamChallengeRouter.post(
    "/add",
    authenticateToken,
    CreateTeamChallenge
);

TeamChallengeRouter.get(
    "/single/:teamChallengeId",
    authenticateToken,
    getTeamChallengeById
);

TeamChallengeRouter.get("/all", authenticateToken, getAllTeamChallenges);

TeamChallengeRouter.put(
    "/update/:teamChallengeId",
    authenticateToken,
    updateTeamChallenge
);

TeamChallengeRouter.delete(
    "/delete/:teamChallengeId",
    authenticateToken,
    deleteTeamChallenge
);


module.exports = TeamChallengeRouter;
