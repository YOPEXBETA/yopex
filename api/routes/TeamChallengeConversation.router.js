const express = require('express');
const {createTeamChallengeConversation, joinTeamChallengeConversation, getTeamChallengeConversation,
    createTeamConversation, joinTeamConversation, getTeamConversation, createTeamChallengeMessage,
    getTeamChallengeMessages, createTeamMessage, getTeamMessages
} = require("../controllers/TeamChallengeConversation.controller");
const TeamChallengeConversationRouter = express.Router();
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");

TeamChallengeConversationRouter.post('/team-challenge-conversation',authenticateToken, createTeamChallengeConversation);

TeamChallengeConversationRouter.post('/team-challenge-conversation/join', authenticateToken, joinTeamChallengeConversation);

TeamChallengeConversationRouter.get('/team-challenge-conversation/:teamChallenge',authenticateToken, getTeamChallengeConversation);

TeamChallengeConversationRouter.post('/team-challenge-message',authenticateToken, createTeamChallengeMessage);

TeamChallengeConversationRouter.get('/team-challenge-messages/:conversationId',authenticateToken, getTeamChallengeMessages);

TeamChallengeConversationRouter.post('/team-conversation',authenticateToken, createTeamConversation);

TeamChallengeConversationRouter.post('/team-conversation/join',authenticateToken, joinTeamConversation);

TeamChallengeConversationRouter.get('/team-conversation/:teamChallenge/:team',authenticateToken, getTeamConversation);

TeamChallengeConversationRouter.post('/team-message', authenticateToken,createTeamMessage);

TeamChallengeConversationRouter.get('/team-messages/:conversationId', authenticateToken,getTeamMessages);

module.exports = TeamChallengeConversationRouter;
