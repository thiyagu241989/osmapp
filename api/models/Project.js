// Project.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Project
let Project = new Schema({
    projectName: {
        type: String
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'project'
});

module.exports = mongoose.model('Project', Project);