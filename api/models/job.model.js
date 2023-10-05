const mongoose = require("mongoose");
const Company = require("./company.model");

const JobSchema = new mongoose.Schema(
  {
    companyId: {
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
    category: {
      type: Array,
      default: [],
    },
    RecommendedSkills: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
      required: false,
    },
    salary: { type: Number, required: false },

    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    appliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    acceptedAppliers: [
     { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      dateAccepted: { type: Date, default: null },
    }
    ],
  },
  { timestamps: true },
);




module.exports = mongoose.model("Job", JobSchema);
