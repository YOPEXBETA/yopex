const mongoose = require("mongoose");

const TeamChallengeConversationSchema = new mongoose.Schema(
    {
        teamChallenge :{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamChallenge' },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true },
);

module.exports = mongoose.model("TeamChallengeConversation", TeamChallengeConversationSchema);
