const express = require("express");
const ContestConversationRouter = express.Router();

//imported controllers

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");
const { joinConversation, createConversation, getConversation } = require("../controllers/contestconversation.controllers");

ContestConversationRouter.post("/", authenticateToken, createConversation);
ContestConversationRouter.post("/join", authenticateToken, joinConversation);
ContestConversationRouter.get("/:contestId", authenticateToken, getConversation);

module.exports = ContestConversationRouter;
