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
    res.json({ level });
    return `Level ${levelName}`;
  } catch (error) {
    console.error(`Error creating level: ${error.message}`);
  }
};

const editLevel = async (req,res) => {

  try {
    const maxscore = req.body.maxScore;
    const id = req.params.id;
  
    const currentLevel = await levels.findById(id);
    if (!currentLevel) {
      return res.status(404).json({ msg: "Level not found" });
    }
    const newMaxScore=currentLevel.maxScore+parseInt(maxscore);
    const oldMaxScore = currentLevel.maxScore;
    await levels.findByIdAndUpdate(
      { _id: req.params.id },
       { maxScore : newMaxScore } , // Use $set to update the maxScore field
      { new: true } // Set { new: true } to get the updated document
    );

    const nextLevel = await levels.findOne({
      minScore:  oldMaxScore ,
    });
    if (nextLevel) {
      await levels.findByIdAndUpdate(
        nextLevel._id,
        {  minScore: newMaxScore  }, // You can adjust the logic as needed
        { new: true }
      );
    }

    res.json({ msg: "Updated a level" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

}

const getLevels = async (req, res) => {
    try {
      const level = await levels.find();
      res.json(level);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const deleteLevel = async (req, res) => {
    try {
      // Find the level you want to delete and store its details
      const levelToDelete = await levels.findById(req.params.id);
  
      if (!levelToDelete) {
        return res.status(404).send("Level not found");
      }
  
      const deletedMaxScore = levelToDelete.maxScore;

      const previousLevel = await levels.findOne({ maxScore: levelToDelete.minScore  });

  
      // Delete the level
      
  
      // Find all levels with maxScore greater than the deleted level's maxScore
      const levelsToDowngrade = await levels.find({ maxScore: { $gt: deletedMaxScore } });
   await levels.findByIdAndDelete(req.params.id);
      // Update the levels to reflect the downgrade
      for (const level of levelsToDowngrade) {
        const newMinScore = previousLevel ? previousLevel.maxScore  : 0;
        const newMaxScore = level.minScore + (level.maxScore - deletedMaxScore);
        level.name = `Level ${parseInt(level.name.replace("Level ", "")) - 1}`;
        level.minScore = newMinScore;
        level.maxScore = newMaxScore;
        await level.save();

        previousLevel = level;
      }
     

  
      res.status(200).send("Level has been deleted !    ");
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };

  module.exports = {
    getLevels,
    deleteLevel,
    createLevel,
    editLevel
  };