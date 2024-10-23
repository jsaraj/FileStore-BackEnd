

const mongoose = require("mongoose");
const mainSlider = new mongoose.Schema({
    imageSrc: {
        require: true,
        type: String
    },
    imageAlt: {
        require: true,
        type: String
    },
    imageLink: {
        require: true,
        type: String
    },
    imageStatus: {
        require: true,
        type: Boolean
    },
    publishDate: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    }

})
module.exports = mongoose.model("mainSlider", mainSlider);