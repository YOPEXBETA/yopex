const userModel = require("../models/user.model");
const ExperienceModel = require("../models/Experience.model");

const ObjectId = require("mongoose").Types.ObjectId;

const addExperience = async (req, res) => {
  try {
    const {
      title,
      type,
      company,
      localtion,
      locationtype,
      startdate,
      enddate,
      description,
      skills,
    } = req.body;
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const Experience = new ExperienceModel({
      title,
      type,
      company,
      localtion,
      locationtype,
      startdate,
      enddate,
      description,
      skills,
      user: userId,
    });
    const experience = await Experience.save();
    user.experiences.push(experience._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Experience created successfully", Experience });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to create Experience: ${error.message}` });
  }
};

const getUserExperience = async (req, res) => {
  try {
    const { userId } = req.params;
    const userExperience = await ExperienceModel.find({
      user: new ObjectId(userId),
    });
    res.status(200).json(userExperience);
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to get user Experience: ${error.message}` });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const Experience = await ExperienceModel.findById(id);
    res.status(200).json({ Experience });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to get Experience: ${error.message}` });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      company,
      localtion,
      locationtype,
      startdate,
      enddate,
      description,
      skills,
    } = req.body;
    const Experience = await ExperienceModel.findById(id);
    if (!Experience) {
      return res.status(400).json({ error: "Experience not found" });
    }
    if (Experience.user.toString() !== req.userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this Experience" });
    }
    const updatedExperience = await ExperienceModel.findByIdAndUpdate(
      id,
      {
        title,
        type,
        company,
        localtion,
        locationtype,
        startdate,
        enddate,
        description,
        skills,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Experience updated successfully", updatedExperience });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to update Experience: ${error.message}` });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await ExperienceModel.findById(id);
    if (!experience) {
      return res.status(400).json({ error: "Experience not found" });
    }
    if (experience.user.toString() !== req.userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this Experience" });
    }
    await ExperienceModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to delete Experience: ${error.message}` });
  }
};

module.exports = {
  addExperience,
  getUserExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
