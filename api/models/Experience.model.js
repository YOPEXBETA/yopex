const mongoose = require("mongoose");

const JobExperienceSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobExperience", JobExperienceSchema);
