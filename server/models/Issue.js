const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('Issue', IssueSchema);

