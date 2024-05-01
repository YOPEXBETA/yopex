const express = require("express");
const PostsRouter = express.Router();

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
} = require("../controllers/Posts.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

PostsRouter.post("/", authenticateToken, CreatePost);
PostsRouter.get("/posts", authenticateToken, getFeedPosts);

PostsRouter.get("/single/:postId", authenticateToken, getpostById);
PostsRouter.get("/:userId", authenticateToken, getUserPosts);
PostsRouter.delete("/delete/:id", authenticateToken, deletePost);
PostsRouter.put("/:id", authenticateToken, updateAPost);
PostsRouter.patch("/:id/like", authenticateToken, likePost);
PostsRouter.patch("/share", authenticateToken, sharePost);
PostsRouter.patch("/:userId/bookmark/:postId", authenticateToken, BookmarkPost);
PostsRouter.get("/bookmarks/:userId", authenticateToken, getBookmarks);

module.exports = PostsRouter;
