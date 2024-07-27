const express = require("express");
const jobRouter = express.Router();

const {
  addJob,
  getAllJobs,
  updateJob,
  geJobById,
  deleteJob,
  getByUserId,
  applyJob,
  unapplyJob,
  getAppliers,
  acceptApplier,
  getAcceptedAppliers,
  getSortedAppliers,
} = require("../controllers/job.controller");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

jobRouter.post("/add", authenticateToken, addJob);
jobRouter.get("/all", getAllJobs);
jobRouter.put("/update/:id", authenticateToken, updateJob);
jobRouter.get("/:organizationId", authenticateToken, geJobById);
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
