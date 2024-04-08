const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    //default: 1,
  },
  minScore: {
    type: Number,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
