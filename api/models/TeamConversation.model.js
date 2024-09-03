const mongoose = require("mongoose");

const TeamConversationSchema = new mongoose.Schema(
    {
        teamChallenge :{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamChallenge' },
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true },
);

module.exports = mongoose.model("TeamConversation", TeamConversationSchema);
