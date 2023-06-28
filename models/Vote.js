//models/Vote.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bill: {
        type: Schema.Types.ObjectId,
        ref: 'Summary',
        required: true
    },
    vote: {
        type: String,
        enum: ['pass', 'veto', 'null'],
        default: 'null'
    }
}, {
    timestamps: true
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;