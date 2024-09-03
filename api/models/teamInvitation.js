const mongoose = require('mongoose');

const TeamInvitationSchema = new mongoose.Schema(
    {
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        email: { type: String, lowercase: true },
        challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamChallenge' },
        status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('TeamInvitation', TeamInvitationSchema);
