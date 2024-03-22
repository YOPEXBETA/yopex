const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: { type: Number, required: false },
    jobType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Freelance",
        "Internship",
        "Volunteering",
        "Scholarship",
      ],
      default: "Full-time",
    },

    offerType: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      default: "On-site",
    },
    paid: { type: Boolean, required: false },

    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    appliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    acceptedAppliers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        dateAccepted: { type: Date, default: null },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
