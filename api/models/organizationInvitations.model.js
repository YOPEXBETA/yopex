const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema(
    {
        organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invitation", InvitationSchema);
