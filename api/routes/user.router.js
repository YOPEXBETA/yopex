const express = require("express");
const userRouter = express.Router();

//imported controllers
const {
  editProfile,
  SearchUsers,
  getUser,
  getUsers,
  getUserFriends,
  getUserFollowings,
  getsuggestedUsers,
  getBadgesEarnedByUser,
  followUnfollowUser,
  JoinChallenge,
  unjoinChallenge,
  getUserChallenges,
  getUserStats,
  getUserNotifications,
  banUser,
  CreateCompany,
  getCurrentUser,
} = require("../controllers/user.controller");

const validate = require("../middlewares/SchemaValidation.middleware");

const {
  createReview,
  getReviews,
  getReviewsByChallengeUser,
} = require("../controllers/review.controller");

const {
  userEditProfileValidator,
} = require("../validators/user.auth.validators");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

userRouter.put(
  "/users/edit/",
  validate(userEditProfileValidator),
  authenticateToken,
  editProfile,
);
userRouter.get("/me", authenticateToken, getCurrentUser); //seach users
userRouter.get("/users", authenticateToken, SearchUsers); //seach users
userRouter.get("/allusers", authenticateToken, getUsers); //seach users
userRouter.get("/:id", authenticateToken, getUser);
userRouter.get("/find/friends/:userId", authenticateToken, getUserFriends);
userRouter.get(
  "/find/followings/:userId",
  authenticateToken,
  getUserFollowings,
);
userRouter.put(
  "/toggleFollow/:otherUserId",
  authenticateToken,
  followUnfollowUser,
);
userRouter.get("/find/suggestedUsers", authenticateToken, getsuggestedUsers);
userRouter.get("/:userId/badges", authenticateToken, getBadgesEarnedByUser);
userRouter.post("/join", authenticateToken, JoinChallenge);
userRouter.post("/unjoin", authenticateToken, unjoinChallenge);
userRouter.get("/user/challenges", authenticateToken, getUserChallenges);
userRouter.get(
  "/user/:userId/notifications",
  authenticateToken,
  getUserNotifications,
);
userRouter.get("/users/stats", authenticateToken, getUserStats);
userRouter.post("/review/create", authenticateToken, createReview);
userRouter.get("/reviews/:id", authenticateToken, getReviews);
userRouter.get(
  "/review/challenge/:id",
  authenticateToken,
  getReviewsByChallengeUser,
);
userRouter.get("/user/ban/:id", authenticateToken, banUser);
userRouter.post("/create", authenticateToken, CreateCompany);

module.exports = userRouter;
