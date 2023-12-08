const express = require("express");
const JobTypeRouter = express.Router();

const {
  createJobType,
  getJobsTypes,
} = require("../controllers/JobType.Controllers");

JobTypeRouter.post("/add", createJobType);
JobTypeRouter.get("/all", getJobsTypes);

module.exports = JobTypeRouter;
