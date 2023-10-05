const express = require("express");
const CommentRouter = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
  updateComment
} = require("../controllers/Comment.controllers");
// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

CommentRouter.post("/", authenticateToken, addComment);
CommentRouter.get("/:postId", authenticateToken, getComments);
CommentRouter.put("/update/:id", authenticateToken, updateComment);
CommentRouter.delete("/:id", authenticateToken, deleteComment);

module.exports = CommentRouter;
