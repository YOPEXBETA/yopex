const mongoose = require("mongoose");
const { boolean } = require("yup");
const jobModel = require("./job.model");
const ChallengeModel = require("./Challenge.model");
const SocialMediaPostModel = require("./SocialMediaPost.model");
const notificationModel = require("./notification.model");
const ConversationModel = require("./Conversation.model");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    companyDescription: { type: String },
    companyLogo: { type: String },
    country: { type: String },
    picturePath: { type: String },
    companyDocument: { type: String },
    websiteUrl: { type: String },
    verified: { type: Boolean, default: false },
    isDocumentSubmitted: { type: Boolean, default: false }, // Document submission status

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

    balance: { type: Number, default: 0.0 },
    dateofFoundation: { type: Date },

    posts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialMediaPost",
        },
      ],
      default: [],
    },
    notificationsCompany: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },

  { timestamps: true },
);

companySchema.pre('findOneAndDelete', { document: false, query: true }, async function (next) {
  try {
    console.log("Middleware executed");
    
    const query = this;
    const companyId = query._conditions._id;

    SocialMediaPostModel.deleteMany({ userId: companyId }).exec();

    jobModel.deleteMany({ company: companyId }).exec();

    ChallengeModel.deleteMany({ company: companyId }).exec();
    
    ConversationModel.deleteMany({ company: companyId }).exec();
    
    
    next();
  } catch (error) {
    console.log("Middleware error");
    next(error);
  }
});

module.exports = mongoose.model("Company", companySchema);
