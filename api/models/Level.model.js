const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;
