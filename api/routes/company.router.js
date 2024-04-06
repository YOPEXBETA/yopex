const express = require("express");

const companyRouter = express.Router();

//imported controllers
const { approveCompany } = require("../controllers/admin.controllers");
const {
  editProfile,
  ChallengeWinner,
  getCompanyNotifications,
  deleteCompany,
  getAllCompanies,
} = require("../controllers/Company.controllers");
const { getCompany } = require("../controllers/Company.controllers");

const validate = require("../middlewares/SchemaValidation.middleware");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const {
  companyEditProfileValidator,
} = require("../validators/company.auth.validators");

companyRouter.put("/approve/:id/", authenticateToken, approveCompany);
companyRouter.put;
companyRouter.put("/:id/", authenticateToken, editProfile);
companyRouter.get("/get/:companyId/", authenticateToken, getCompany);
companyRouter.get("/allcompanies", getAllCompanies);
companyRouter.post("/challengeWinner", authenticateToken, ChallengeWinner);
companyRouter.get(
  "/company/:userId/notifications",
  authenticateToken,
  getCompanyNotifications
);
companyRouter.delete("/:id", authenticateToken, deleteCompany);

module.exports = companyRouter;
