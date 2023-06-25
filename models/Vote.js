// models/Vote.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Summary' },
    vote: { type: String, enum: [null, 'Pass', 'Veto'], default: null }
}, {
    timestamps: true
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
