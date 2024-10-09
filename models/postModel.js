
const mongoose = require('mongoose');
const postModel = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    slug: {
        required: true,
        type: String,
        trim: true
    },
    shortDesc: {
        required: true,
        type: String
    },
    longDesc: {
        required: true,
        type: String
    },
    imageUrl: {
        required: true,
        type: String
    },
    imageAlt: {
        required: true,
        type: String
    },
    tags: {
        required: true,
        type: Array,
        default: []
    },
    realtedPost: {
        required: true,
        type: Array,
        default: []
    },
    comments: {
        required: true,
        type: Array,
        default: []
    },
    type: {
        required: true,
        type: String,
        default: "post"
    },
    pageView: {
        required: true,
        type: Number,
        default: 0
    },
    published: {
        required: true,
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    },
    updatesAt: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    },

});

module.exports = mongoose.model("postModel", postModel);

