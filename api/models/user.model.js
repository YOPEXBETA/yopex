const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: false },
    country: { type: String },
    picturePath: { type: String, required: false },
    userDescription: { type: String, required: false },
    birthDate: { type: Date },
    score: { type: Number, default: 0 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    balance: { type: Number, default: 0.0 },
    yearsRegistered: { type: Number, default: 0 },
    challengesDone: { type: Number, default: 0 },
    challengesWon: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
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
    viewedProfile: { type: Number },
    impressions: { type: Number },
    //role to switch between company and user
    role: { type: String, enum: ["user", "admin", "company"], default: "user" },

    resetToken: { type: String, default: undefined }, //need it for forget password(verification)
    isFaceRecognition: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    posts: {
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
    jobs: [{ type: mongoose.Types.ObjectId, ref: "Job", required: true }],
    notifications: [
      {
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        message: String,
        createdAt: { type: Date, default: Date.now },
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

module.exports = mongoose.model("User", UserSchema);
