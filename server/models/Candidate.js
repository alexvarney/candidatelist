const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: String,
    state: String,
    dob: Date,
    slogan: String,
    status: String,
    polling: Number,
    image: String,
    description: String,
    website: String,
    positions: [{
        issue: mongoose.Schema.Types.ObjectId,
        status: String,
        description: String,
        links: [{
            title: String,
            url: String,
        }]
    }],
});

module.exports = mongoose.model('Candidate', CandidateSchema);