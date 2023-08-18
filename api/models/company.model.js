const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      maxLength: 255,
      trim: true,
      unique: true,
    },
    companyDescription: { type: String },
    companyLogo: { type: String },
    country: { type: String },
    picturePath: { type: String },
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
        message: String,
        createdAt: { type: Date, default: Date.now },
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },

  { timestamps: true },
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
