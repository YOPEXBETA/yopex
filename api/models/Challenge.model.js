const mongoose = require("mongoose");
const submissionModel = require("./submission.model");
const companyModel = require("./company.model");


const ChallengeSchema = new mongoose.Schema(
  {
    nbruser: { type: Number, default: 10 },
    picturePath: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    start:{type:Boolean,required:true,default:false},
    category: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      default: [],
    },
    RecommendedSkills: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],
      default: [],
    },
    price: { type: Number, required: false },
    cover: { type: String },
    images: { type: [String] }, //array that include string
    deliveryTime: { type: Number },
    features: { type: [String] },
    deadline: { type: Date },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paid: { type: Boolean, default: false },
    YoutubeLink: { type: String, required: false},
    users: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        registrationDate: { type: Date, default: Date.now },
        submissionDate: { type: Date },
        review: { type: Boolean, default: false },
      },
    ],
    banned: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
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
