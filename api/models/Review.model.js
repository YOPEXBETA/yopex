const mongoose = require("mongoose");
const User = require("./user.model");
const Organization = require("./Organization.model");
const ChallengeModel = require("./Challenge.model");

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Organization,
            required: false,
        },
        challengeOwnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description: {
            type: String,
            required: true,
        },
        //the number of stars of the user who put the review
        star: {
            type: Number,
            required: true,
            default: 0,
            min: 1,
            max: 10,
        },
        challengeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ChallengeModel,
            required: false,
        },
        teamChallengeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teamChallenge",
            required: false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Review", ReviewSchema);
