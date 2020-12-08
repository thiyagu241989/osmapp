// Site.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Site
let Site = new Schema({
    projectName: {
        type: String
    },
   
    siteName: {
        type: String,
        default: null
    },
    latitude: {
        type: String,
        default: null
    },
    longitude: {
        type: String,
        default: null
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
    collection: 'site'
});

module.exports = mongoose.model('Site', Site);