const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
    {
        //we need the challenge Id
        challengeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge",
        },
        teamChallengeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamChallenge",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        filesPaths: {
            type: [String],
            required: true,
        },
        links: {
            type: [{platform: String, link: String}],
            required: true,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("Submission", SubmissionSchema);
