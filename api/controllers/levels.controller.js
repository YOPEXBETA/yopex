const levels = require("../models/Level.model");
const userSchema = require("../models/user.model");

const createLevel = async (req, res) => {
  try {
    // Find the highest existing level
    const highestLevel = await levels.findOne().sort({ maxScore: -1 });

    // Calculate the min and max scores for the new level
    const newMinScore = highestLevel ? highestLevel.maxScore : 0;
    const newMaxScore = newMinScore + parseInt(req.body.adminDefinedPoints); // For example, each level coast 1000 points

    const levelNumber = highestLevel ? highestLevel.level + 1 : 1;

    const level = new levels({
      level: levelNumber,
      minScore: newMinScore,
      maxScore: newMaxScore,
    });

    await level.save();
    res.status(201).json(level);
  } catch (error) {
    console.error(`Error creating level: ${error.message}`);
    res.status(500).json({ error: "Server error" });
  }
};

const editLevel = async (req, res) => {
  try {
    const maxscore = req.body.maxScore;
    const id = req.params.id;

    const currentLevel = await levels.findById(id);
    if (!currentLevel) {
      return res.status(404).json({ msg: "Level not found" });
    }
    const newMaxScore = currentLevel.maxScore + parseInt(maxscore);
    const oldMaxScore = currentLevel.maxScore;
    await levels.findByIdAndUpdate(
      { _id: req.params.id },
      { maxScore: newMaxScore }, // Use $set to update the maxScore field
      { new: true } // Set { new: true } to get the updated document
    );

    const nextLevel = await levels.findOne({
      minScore: oldMaxScore,
    });
    if (nextLevel) {
      await levels.findByIdAndUpdate(
        nextLevel._id,
        { minScore: newMaxScore }, // You can adjust the logic as needed
        { new: true }
      );
    }
    res.json({ msg: "Updated a level" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

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
      return res.status(200).send(levelToDelete);
    }

    const deletedMaxScore = levelToDelete.maxScore;

    const previousLevel = await levels.findOne({
      maxScore: levelToDelete.minScore,
    });

    // Delete the level

    // Find all levels with maxScore greater than the deleted level's maxScore
    const levelsToDowngrade = await levels.find({
      maxScore: { $gt: deletedMaxScore },
    });
    await levels.findByIdAndDelete(req.params.id);
    // Update the levels to reflect the downgrade
    for (const level of levelsToDowngrade) {
      const newMinScore = previousLevel ? previousLevel.maxScore : 0;
      const newMaxScore = level.minScore + (level.maxScore - deletedMaxScore);
      level.name = `Level ${parseInt(level.name.replace("Level ", "")) - 1}`;
      level.minScore = newMinScore;
      level.maxScore = newMaxScore;
      await level.save();

      previousLevel = level;
    }

    return res.status(201).send(levelsToDowngrade);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Update user's level based on score
const updateUserLevel = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User ID:", userId); // Log userId
    const user = await userSchema.findById(userId);
    console.log("User:", user); // Log user

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const userScore = user.score;
    console.log("User Score:", userScore); // Log userScore

    // Find the level corresponding to the user's score
    const level = await levels.findOne({
      minScore: { $lte: userScore },
      maxScore: { $gte: userScore },
    });
    console.log("Level:", level); // Log level

    if (!level) {
      console.log("Level not found for user score");
      return res
        .status(500)
        .json({ message: "Level not found for user score" });
    }

    user.level = level.name;
    console.log("Updated User:", user); // Log updated user
    await user.save();

    res.status(200).json({ message: "User level updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateUserLevel,
  getLevels,
  deleteLevel,
  createLevel,
  editLevel,
};
