// models/Summary.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema({
    pdf_name: String,
    summary: String
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;
