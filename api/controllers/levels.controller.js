const levels = require("../models/Level.model");

const createLevel = async (req,res) => {
  try {
    // Find the highest existing level
    const highestLevel = await levels.findOne().sort({ maxScore: -1 });

    // Calculate the min and max scores for the new level
    const newMinScore = highestLevel ? highestLevel.maxScore  : 0;
    const newMaxScore = newMinScore + parseInt(req.body.adminDefinedPoints) ; // For example, each level coast 1000 points

    const levelName = highestLevel
    ? `${parseInt(highestLevel.name.replace("Level ", "")) + 1}`
    : "1";

    const level = new levels({ name: `Level ${levelName}`, minScore: newMinScore, maxScore: newMaxScore });
    await level.save();

    return `Level ${levelName}`;
  } catch (error) {
    console.error(`Error creating level: ${error.message}`);
  }
};

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
    deleteLevel,
    createLevel,
  };