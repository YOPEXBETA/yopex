const mongoose = require("mongoose");
const submissionModel = require("./submission.model");

const TeamChallengeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
        },
        picturePath: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        totalStars: { type: Number, default: 0 },
        starNumber: { type: Number, default: 0 },
        start: { type: Boolean, required: true, default: false },
        verified: { type: Boolean, default: false },
        paymentId: { type: String },
        objective: {
            type: String,
            enum: ["Recrutement", "Freelance", "Internship", "Innovation"],
            default: "Recrutement",
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill",
            },
        ],
        price: { type: Number },
        images: [String],
        deliveryTime: { type: Number },
        features: [String],
        deadline: { type: Date },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        paid: { type: Boolean, default: false },
        YoutubeLink: { type: String },
        teams: [
            {
                team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
                registrationDate: { type: Date, default: Date.now },
                submissionDate: { type: Date },
                review: { type: Boolean, default: false },
                star: { type: Number, default: 0 },
            },
        ],
        banned: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
            },
        ],
        submissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Submission",
            },
        ],
        teamSize: { type: Number, default: 0 },
    },
    { timestamps: true }
);

TeamChallengeSchema.pre(
    "findOneAndDelete",
    { document: false, query: true },
    async function (next) {
        try {
            console.log("TeamChallenge Middleware executed");

            const query = this;
            const teamChallengeId = query._conditions._id;

            await submissionModel.deleteMany({ teamChallengeId: teamChallengeId }).exec();

            next();
        } catch (error) {
            console.log("TeamChallenge Middleware error");
            next(error);
        }
    }
);
const TeamChallenge = mongoose.models.TeamChallenge || mongoose.model("TeamChallenge", TeamChallengeSchema);

module.exports = TeamChallenge;
