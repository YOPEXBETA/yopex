const express = require("express");
const MessageRouter = express.Router();

//imported controllers
const {
  createMessage,
  getMessages,
  getContestMessages,
} = require("../controllers/messages.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

MessageRouter.post("/", authenticateToken, createMessage);
MessageRouter.get("/:conversationId", authenticateToken, getMessages);
MessageRouter.get("/contest/:conversationId", authenticateToken, getContestMessages);
module.exports = MessageRouter;
