const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    category: {
      type: String,
      required: true,
    },
    RecommendedSkills: {
      type: Array,
      default: [],
    },
    price: { type: Number, required: false },
    cover: { type: String },
    images: { type: [String] }, //array that include string
    deliveryTime: { type: Number },
    features: { type: [String] },
    deadline: { type: Date },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);
