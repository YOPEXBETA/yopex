const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
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
        paid: {type: Boolean, required: false},
        salaryRange: {
            min: {
                type: Number,
                required: false,
            },
            max: {
                type: Number,
                required: false,
            },
            currency: {
                type: String,
                required: false,
            },
        },
        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill",
            },
        ],
        appliersNumber: {type: Number, required: false},
        appliers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        acceptedAppliers: [
            {
                user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                dateAccepted: {type: Date, default: null},
            },
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Job", JobSchema);
