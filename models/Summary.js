//models/Summary.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const summarySchema = new Schema(
    {
        summary: {
            type: String,
            required: true,
        },
        bill_name: {
            type: String,
            required: true,
        },
        tags: [String],
        helps: {
            type: String,
            required: true,
        },
        hurts: {
            type: String,
            required: true,
        },
        pass: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        veto: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
    },
    { collection: 'bill_summaries' } // Specify the collection name here
);

module.exports = mongoose.models.Summary || mongoose.model('Summary', summarySchema);