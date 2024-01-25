const express = require("express");
const ProjectsRouter = express.Router();

//imported controllers
const {
  CreatePost,
  updateAPost,
  getFeedPosts,
  deletePost,
  getUserPosts,
  likePost,
  sharePost,
  BookmarkPost,
  getBookmarks,
  getpostById,
} = require("../controllers/Projects.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

ProjectsRouter.post("/", authenticateToken, CreatePost);
ProjectsRouter.get("/posts", authenticateToken, getFeedPosts);

ProjectsRouter.get("/single/:postId", authenticateToken, getpostById);
ProjectsRouter.get("/:userId", authenticateToken, getUserPosts);
ProjectsRouter.delete("/delete/:id", authenticateToken, deletePost);
ProjectsRouter.put("/:id", authenticateToken, updateAPost);
ProjectsRouter.patch("/:id/like", authenticateToken, likePost);
ProjectsRouter.patch("/share", authenticateToken, sharePost);
ProjectsRouter.patch(
  "/:userId/bookmark/:postId",
  authenticateToken,
  BookmarkPost
);
ProjectsRouter.get("/bookmarks/:userId", authenticateToken, getBookmarks);

module.exports = ProjectsRouter;
