const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;