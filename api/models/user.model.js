const mongoose = require("mongoose");
const SocialMediaPost = require("./Post.model");
const Organization = require("./Organization.model");
const submissionModel = require("./submission.model");
const notificationModel = require("./notification.model");
//const experiences = require("./Experience.model") hiiii;

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: false },
    occupation: { type: mongoose.Types.ObjectId, ref: "Occupation" },
    websiteURL: { type: String, required: false },
    country: { type: String, required: false },
    picturePath: { type: String, required: false },
    userDescription: { type: String, required: false },
    birthDate: { type: Date, required: false },
    score: { type: Number, default: 0 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator","instructor"],
      default: "user",
    },
    resetToken: { type: String, default: undefined },
    isVerified: { type: Boolean, default: false },
    status: { type: String, default: "active" },
    balance: { type: Number, default: 0.0 },
    /*yearsRegistered: { type: Number, default: 0 },*/
    challengesDone: { type: Number, default: 0 },
    challengesWon: { type: Number, default: 0 },
    /*phoneNumber: {
      type: String,
      maxLength: 14,
      default: "",
    },*/
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    reviews: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
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
    createdChallenge: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Challenge",
        },
      ],
      default: [],
    },
      /*createdTeamChallenge: {
          type: [
              {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "TeamChallenge",
              },
          ],
          default: [],
      },*/
    socialMediaLinks: [
      {
        platform: { type: String, required: false },
        url: { type: String, required: false },
      },
    ],

    challenges: [{ type: mongoose.Types.ObjectId, ref: "Challenge" }],
    /*teamChallenges: [{ type: mongoose.Types.ObjectId, ref: "TeamChallenge" }],*/
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
    currentWorkspace: {
        label: {
              type: String,
              enum: ['User', 'Organization'],
              default: 'User',
          },
        organizationID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Organization',
              default: null,
          },
      },
    organizations: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organization",
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

      Organization.deleteMany({ user: userId }).exec();

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
