const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        teamLeader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
