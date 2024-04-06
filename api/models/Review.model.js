const mongoose = require("mongoose");
const User = require("./user.model");
const Company = require("./company.model");
const ChallengeModel = require("./Challenge.model");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Company,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
