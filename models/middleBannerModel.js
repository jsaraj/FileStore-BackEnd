
const mongoose = require('mongoose');
const middleBannerModel = new mongoose.Schema({
    imageUrl: {
        required: true,
        type: String
    },
    imageAlt: {
        required: true,
        type: String
    },
    imageLink: {
        required: true,
        type: String
    },
    imageStatus: {
        required: true,
        type: Boolean
    },
    publishDate: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    },

});

module.exports=mongoose.model("MiddleBannerModel",middleBannerModel);

