//models/summary.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema({
    pdf_name: String,
    summary: String,
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote'
    }]
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;
