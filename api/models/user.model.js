const mongoose = require("mongoose");
const SocialMediaPost = require("./SocialMediaPost.model");
const Company = require("./company.model");
const submissionModel = require("./submission.model");
const notificationModel = require("./notification.model");
//const experiences = require("./Experience.model");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: false },
    occupation: { type: String, required: false },
    websiteURL: { type: String, required: false },
    country: { type: String },
    picturePath: { type: String, required: false },
    userDescription: { type: String, required: false },
    birthDate: { type: Date, required: false },
    score: { type: Number, default: 0 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other",""],
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    resetToken: { type: String, default: undefined },
    isVerified: { type: Boolean, default: false },
    status: { type: String, default: "active" },
    balance: { type: Number, default: 0.0 },
    yearsRegistered: { type: Number, default: 0 },
    challengesDone: { type: Number, default: 0 },
    challengesWon: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    viewedProfile: { type: Number },
    impressions: { type: Number },
    phoneNumber: {
      type: String,
      maxLength: 14,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    historyPayment: {
      type: Array,
      default: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Payment",
        },
      ],
    },

    skills: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],
      default: [],
    },

    socialMediaLinks: [
      {
        platform: { type: String, required: false },
        url: { type: String, required: false },
      },
    ],

    experiences: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Experience",
        },
      ],
      default: [],
    },
    educations: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Education",
        },
      ],
      default: [],
    },
    posts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialMediaPost",
        },
      ],
      default: [],
    },
    bookmarks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialMediaPost",
        },
      ],
      default: [],
    },

    challenges: [{ type: mongoose.Types.ObjectId, ref: "Challenge" }],

    badgesEarned: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BadgeType",
        },
      ],
      default: [],
    },
    submissions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Submission",
        },
      ],
      default: [],
    },
    messages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
        },
      ],
      default: [],
    },
    jobs: [{ type: mongoose.Types.ObjectId, ref: "Job" }],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    companies: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
);

UserSchema.virtual("yearsRegisteredCalcu").get(function () {
  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const yearsRegisteredCalcu = now.getFullYear() - createdAt.getFullYear();
  if (
    now.getMonth() < createdAt.getMonth() ||
    (now.getMonth() === createdAt.getMonth() &&
      now.getDate() < createdAt.getDate())
  ) {
    yearsRegisteredCalcu--;
  }
  this.yearsRegistered = yearsRegisteredCalcu || 0;
  return this.yearsRegistered;
});

UserSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    try {
      console.log("Middleware executed");

      const query = this;
      const userId = query._conditions._id;

      SocialMediaPost.deleteMany({ userId: userId }).exec();

      Company.deleteMany({ user: userId }).exec();

      submissionModel.deleteMany({ userId: userId }).exec();

      notificationModel.deleteMany({ user: userId }).exec();

      next();
    } catch (error) {
      console.log("Middleware error");
      next(error);
    }
  }
);

module.exports = mongoose.model("User", UserSchema);
