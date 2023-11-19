const express = require("express");
const userRouter = express.Router();

// Only enable if special route is enabled
const userSchema = require("../models/user.model");

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
  CreateCompany,
  getCurrentUser,
  followUnfollowCompany,
  getUserFollowingsCompanies,
  seeNotification,
  getStatistic,
  uploadFile,
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
const { uploadFileToFirebase } = require("../controllers/firebase.controllers");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.put("/users/edit/", authenticateToken, editProfile);
userRouter.get("/me", authenticateToken, getCurrentUser); //seach users
userRouter.get("/users", authenticateToken, SearchUsers); //seach users
userRouter.get("/allusers",authenticateToken, getUsers); //seach users
userRouter.get("/:id", authenticateToken, getUser);
userRouter.get("/find/friends/:userId", authenticateToken, getUserFriends);
userRouter.get(
  "/find/followings/:userId",
  authenticateToken,
  getUserFollowings
);

userRouter.get(
  "/find/followingsCompanies/:userId",
  authenticateToken,
  getUserFollowingsCompanies
);

userRouter.put(
  "/toggleFollow/:otherUserId",
  authenticateToken,
  followUnfollowUser
);

userRouter.put(
  "/toggleFollowCompany/:companyId",
  authenticateToken,
  followUnfollowCompany
);
userRouter.get("/find/suggestedUsers", authenticateToken, getsuggestedUsers);
userRouter.get("/:userId/badges", authenticateToken, getBadgesEarnedByUser);
userRouter.post("/join", authenticateToken, JoinChallenge);
userRouter.post("/unjoin", authenticateToken, unjoinChallenge);
userRouter.get("/user/challenges", authenticateToken, getUserChallenges);
userRouter.get(
  "/user/:userId/notifications",
  authenticateToken,
  getUserNotifications
);
userRouter.get("/users/stats", authenticateToken, getUserStats);
userRouter.post("/review/create", authenticateToken, createReview);
userRouter.get("/reviews/:id", authenticateToken, getReviews);
userRouter.get(
  "/review/challenge/:id",
  authenticateToken,
  getReviewsByChallengeUser
);
userRouter.post("/create", authenticateToken, CreateCompany);
userRouter.put("/notifications/seen", authenticateToken, seeNotification);

// Special Route: Add missing fields to all users at once. Only use in development
userRouter.patch("/special", async (req, res) => {
  const users = await userSchema.updateMany({}, { status: "active" });
  return res.status(200).json(users);
});

userRouter.get("/get/stat",getStatistic) 




userRouter.post("/upload",upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    
    const type = req.body.type || "undefined"; // You can pass the type in the request body

    const downloadURL = await uploadFileToFirebase(file, type);

    res.status(200).json({ message: "File uploaded to Firebase Storage", downloadURL });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  }
});

module.exports = userRouter;

