const express = require("express");
const ChallengeRouter = express.Router();

//imported controllers
const {
  CreateChallenge,
  deleteChallenge,
  getChallengeById,
  getCompanyChallenges,
  getAllChallenges,
  getChallengeUsers,
  getChallengeUserSubmit,
  updateChallenge,
  startChallenge,
  banUser,
  unBanUser,
  getChallengeSubmission, CreateOrganizationChallenge, getOrganizationChallenges,
} = require("../controllers/Challenge.controller");
const { CreateSubmission, editsubmission } = require("../controllers/submission.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const validate = require("../middlewares/SchemaValidation.middleware");

const {
  challengeSchemaValidator,
} = require("../validators/challenge.validators");

ChallengeRouter.post(
  "/add",
  authenticateToken,
  CreateChallenge,
  validate(challengeSchemaValidator)
);
ChallengeRouter.post(
    "/addOrganizationChallenge",
    authenticateToken,
    CreateOrganizationChallenge,
    validate(challengeSchemaValidator)
);

ChallengeRouter.get(
  "/single/:challengeId",
  authenticateToken,
  getChallengeById
);

ChallengeRouter.get("/company/:organizationId", authenticateToken, getOrganizationChallenges);
ChallengeRouter.get("/challenges/all", getAllChallenges);
ChallengeRouter.get("/getChallengeUsers", authenticateToken, getChallengeUsers);
ChallengeRouter.get(
  "/getChallengeUserSubmit",
  authenticateToken,
  getChallengeUserSubmit
);
ChallengeRouter.delete(
  "/deleteChallenge/:id",
  authenticateToken,
  deleteChallenge
);
ChallengeRouter.put("/update/:challengeId", authenticateToken,updateChallenge);

ChallengeRouter.post("/submission", authenticateToken, CreateSubmission);
ChallengeRouter.delete("/:id", authenticateToken, deleteChallenge);

ChallengeRouter.post("/editSubmission", authenticateToken, editsubmission);
ChallengeRouter.put("/start/:challengeId", authenticateToken, startChallenge);

ChallengeRouter.put("/ban/:challengeId", authenticateToken, banUser);

ChallengeRouter.put("/unban/:challengeId", authenticateToken, unBanUser);
ChallengeRouter.get("/getChallengeSubmission/:challengeId", authenticateToken, getChallengeSubmission);
module.exports = ChallengeRouter;
