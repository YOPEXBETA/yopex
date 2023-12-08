const JobTypeModel = require("../models/jobType.model");

const createJobType = async (req, res) => {
  try {
    const jobType = await JobTypeModel.create({
      name: req.body.name,
    });
    res.status(201).json(jobType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobsTypes = async (req, res, next) => {
  try {
    const jobType = await JobTypeModel.find();
    res.status(200).json(jobType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJobType,
  getJobsTypes,
};
