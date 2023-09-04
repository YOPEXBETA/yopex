const levels = require("../models/Level.model");

const getLevels = async (req, res) => {
    try {
      const level = await levels.find();
      res.json(level);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

  module.exports = {
    getLevels
  };