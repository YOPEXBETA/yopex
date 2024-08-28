const express = require("express");
const jobRouter = express.Router();

const {
  addJobOffer,
  getAllJobs,
  updateJob,
  deleteJob,
  getByUserId,
  applyJob,
  unapplyJob,
  getAppliers,
  acceptApplier,
  getAcceptedAppliers,
  getSortedAppliers, getJobByOrganizationId, getJobById, getAppliersWithStatus,
} = require("../controllers/job.controller");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

jobRouter.post("/add", addJobOffer);
jobRouter.get("/all", getAllJobs);
jobRouter.put("/update/:id", authenticateToken, updateJob);
jobRouter.get("/:organizationId", authenticateToken, getJobByOrganizationId);
jobRouter.get("/getJobById/:jobId", authenticateToken, getJobById);
jobRouter.get('/appliersWithStatus/:jobId', getAppliersWithStatus);
jobRouter.delete("/:id", authenticateToken, deleteJob);
jobRouter.get("/user/:id", authenticateToken, getByUserId);
jobRouter.put("/jobs/:jobId/apply/:userId", applyJob);
jobRouter.put("/jobs/:jobId/unapply/:userId", unapplyJob);
jobRouter.get("/jobs/:jobId/appliers", getAppliers);
jobRouter.get("/jobs/:jobId/sortedappliers", getSortedAppliers);
jobRouter.put(
  "/jobs/:jobId/appliers/:userId/accept",
  authenticateToken,
  acceptApplier
);

jobRouter.get("/jobs/:jobId/accepted-appliers", getAcceptedAppliers);

module.exports = jobRouter;
