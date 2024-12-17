const mongoose = require('mongoose');

const waitingListSchema = new mongoose.Schema({
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    createdAt: { type: Date, default: Date.now },
    // Add any other relevant fields like `reason` for waiting, priority, etc.
}, { timestamps: true });

const WaitingList = mongoose.model('WaitingList', waitingListSchema);

module.exports = WaitingList;