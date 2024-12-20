const express = require("express");
const ConversationRouter = express.Router();

//imported controllers
const {
  createConversation,
  getConversations,
  getConversationById, getConversationByMembers,
} = require("../controllers/conversation.controller");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");
ConversationRouter.get("/ByMembers", authenticateToken, getConversationByMembers);
ConversationRouter.post("/", authenticateToken, createConversation);
ConversationRouter.get("/:userId", authenticateToken, getConversations);
ConversationRouter.get("/conn/:id", authenticateToken, getConversationById);


module.exports = ConversationRouter;
 