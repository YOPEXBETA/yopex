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

  const deleteLevel = async (req, res) => {
    try {
      
    
   await levels.findByIdAndDelete(req.params.id);
        res.status(200).send("Level has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  module.exports = {
    getLevels,
    deleteLevel
  };