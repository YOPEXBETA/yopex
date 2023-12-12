const skills = require("../models/skill.model");
const SocialMediaPost = require("../models/SocialMediaPost.model");

const createskill = async (req, res) => {
  try {
    const { name } = req.body;
    const skill = await skills.findOne({ name });
    if (skill)
      return res.status(400).json({ msg: "This skill already exists." });

    const newskill = new skills({ name });

    await newskill.save();
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteskill = async (req, res, next) => {
  try {
    const posts = await SocialMediaPost.findOne({
      name: req.params.name,
    });
    if (posts)
      return res.status(400).json({
        msg: "Please delete all products with a relationship.",
      });

    await skills.findOneAndDelete({ name: req.params.name });
    res.json({ msg: "Deleted a skill" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getSkills = async (req, res, next) => {
  try {
    const q = req.query;
    const filters = {
      ...(q.search && { name: { $regex: q.search, $options: "i" } }),
    };
    const allskills = await skills.find(filters);
    await res.status(200).json(allskills);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateskill = async (req, res, next) => {
  try {
    const { name } = req.body;
    await skills.findOneAndUpdate({ _id: req.params.id }, { name });

    res.json({ msg: "Updated a skill" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createskill,
  deleteskill,
  getSkills,
  updateskill,
};
