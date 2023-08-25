const skills = require("../models/skill.model");
const SocialMediaPost = require("../models/SocialMediaPost.model");

const skillController = {
  getSkills: async (req, res) => {
    try {
      const categories = await skills.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createskill: async (req, res) => {
    try {
      const { name } = req.body;
      const skill = await skills.findOne({ name });
      if (skill)
        return res.status(400).json({ msg: "This skill already exists." });

      const newskill = new skills({ name });

      await newskill.save();
      res.json({ newskill });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteskill: async (req, res) => {
    try {
      const posts = await SocialMediaPost.findOne({
        skill: req.params.name,
      });
      if (posts)
        return res.status(400).json({
          msg: "Please delete all products with a relationship.",
        });

      await skills.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a skill" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateskill: async (req, res) => {
    try {
      const { name } = req.body;
      await skills.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated a skill" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = skillController;
