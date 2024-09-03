const mongoose = require("mongoose");


const NotificationSchema = new mongoose.Schema(
    {
        type: {type: String, required: true},
        message: {
            type: String,
            required: true,
        },
        picture: {type: String},
        challenge: {type: mongoose.Schema.Types.ObjectId, ref: "Challenge"},
        teamChallenge: {type: mongoose.Schema.Types.ObjectId, ref: "TeamChallenge"},
        job: {type: mongoose.Schema.Types.ObjectId, ref: "Job"},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        organization: {type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
        invitation: {type: mongoose.Schema.Types.ObjectId, ref: "Invitation"},
        teamInvitation: {type: mongoose.Schema.Types.ObjectId, ref: "TeamInvitation"},
        createdAt: {type: Date, default: Date.now},
        seen: {type: Boolean, default: false},
    },
    {timestamps: true},
);

module.exports = mongoose.model("Notification", NotificationSchema);
