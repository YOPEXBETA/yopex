const mongoose = require("mongoose");
const { boolean } = require("yup");
const jobModel = require("./job.model");
const ChallengeModel = require("./Challenge.model");
const SocialMediaPostModel = require("./Post.model");
const notificationModel = require("./notification.model");
const ConversationModel = require("./Conversation.model");

const organizationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //owner
        organizationName: { type: String, required: true },
        organizationDescription: { type: String },
        organizationLogo: { type: String },
        organizationBanner: { type: String },
        country: { type: String },
        PhoneNumber: { type: String },
        address: { type: String },
        websiteURL: { type: String, required: false },
        organizationDocument: { type: String },
        verified: { type: Boolean, default: false },
        isDocumentSubmitted: { type: Boolean, default: false }, // Document submission status
        socialMediaLinks: [
            {
                platform: { type: String, required: false },
                url: { type: String, required: false },
            },
        ],
        jobs: [{ type: mongoose.Types.ObjectId, ref: "Job" }],
        challenges: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Challenge",
                },
            ],
            default: [],
        },
        organizationBalance: { type: Number, default: 0.0 },
        dateOfFoundation: { type: Date },
        notificationsOrganization: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Notification",
            },
        ],
        organizationType: {
            type: String,
            enum: ['Company', 'University', 'Club', 'Non-Governmental Organization'],
            required: true
        },
        sectorOfActivity: {
            type: String
        },
        organizationMembers: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                roleName: { type: String },
            },
        ]
    },

    { timestamps: true }
);

organizationSchema.pre(
    "findOneAndDelete",
    { document: false, query: true },
    async function (next) {
        try {
            console.log("Middleware executed");

            const query = this;
            const organizationId = query._conditions._id;

            SocialMediaPostModel.deleteMany({ userId: organizationId }).exec();
            jobModel.deleteMany({ organization: organizationId }).exec();
            ChallengeModel.deleteMany({ organization: organizationId }).exec();
            ConversationModel.deleteMany({ organization: organizationId }).exec();

            next();
        } catch (error) {
            console.log("Middleware error");
            next(error);
        }
    }
);

module.exports = mongoose.model("Organization", organizationSchema);
