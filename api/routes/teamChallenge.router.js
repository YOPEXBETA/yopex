const express = require("express");
const TeamChallengeRouter = express.Router();
const {
    CreateTeamChallenge,
    getTeamChallengeById,
    getAllTeamChallenges,
    updateTeamChallenge,
    deleteTeamChallenge, getOrganizationTeamChallenges, banTeam, unbanTeam, startTeamChallenge, unjoinTeamChallenge,
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

TeamChallengeRouter.get("/organization/:organizationId", authenticateToken, getOrganizationTeamChallenges);
TeamChallengeRouter.put(
    "/banTeam/:teamChallengeId",
    authenticateToken,
    banTeam
);
TeamChallengeRouter.put(
    "/unbanTeam/:teamChallengeId",
    authenticateToken,
    unbanTeam
);
TeamChallengeRouter.put(
    "/start/:teamChallengeId",
    authenticateToken,
    startTeamChallenge
);
TeamChallengeRouter.post(
    "/unjoin",
    authenticateToken,
    unjoinTeamChallenge
);
module.exports = TeamChallengeRouter;
