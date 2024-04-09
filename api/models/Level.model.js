const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  level: {
    type: Number,
    default: 1,
  },
  minScore: {
    type: Number,
    default: 0,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
