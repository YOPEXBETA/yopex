const mongoose = require("mongoose");
const submissionModel = require("./submission.model");
const organizationModel = require("./Organization.model");

const ChallengeSchema = new mongoose.Schema(
  {
    //nbruser: { type: Number, default: 10 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
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
    //enum objective
    objective: {
      type: String,
      enum: ["Recrutement", "Freelance", "Internship", "Innovation"],
      default: "Recrutement",
    },
    categories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      default: [],
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    price: { type: Number, required: false },
    images: { type: [String] }, //array that include string
    deliveryTime: { type: Number },
    features: { type: [String] },
    deadline: { type: Date },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paid: { type: Boolean, default: false },
    YoutubeLink: { type: String, required: false },
    users: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        registrationDate: { type: Date, default: Date.now },
        submissionDate: { type: Date },
        review: { type: Boolean, default: false },
        star: { type: Number, default: 0 },
      },
    ],
    banned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    submissions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Submission",
        },
      ],
      default: [],
    },
    nbruser: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ChallengeSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    try {
      console.log("Middleware executed");

      const query = this;
      const challengeId = query._conditions._id;

      submissionModel.deleteMany({ challengeId: challengeId }).exec();

      next();
    } catch (error) {
      console.log("Middleware error");
      next(error);
    }
  }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);
