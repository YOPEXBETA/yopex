const mongoose = require("mongoose");

const ContestConversationSchema = new mongoose.Schema(
  {
    contestId:{type:String, ref: "challenge"},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("ContestConversation", ContestConversationSchema);
