
const midBannerModel = require("../models/middleBannerModel");


const getAllMidBanner = async (req, res) => {
    try {
        const allMidBanner = await midBannerModel.find();
        res.status(200).json(allMidBanner);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get All Middle Banner" })
    }
}

module.exports.getAllMidBanner = getAllMidBanner;


const newMiddleBanner = async (req, res) => {
    try {
        const newMiddleBanner = new midBannerModel({
            imageUrl: req.body.imageUrl,
            imageAlt: req.body.imageAlt,
            imageLink: req.body.imageLink,
            imageStatus: req.body.imageStatus,
            publishDate: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        })

        newMiddleBanner.save()
            .then(d => {
                res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({ msg: "خطا در دریافت اطلاعات" })
            })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in New Middle Banner" })
    }
}

module.exports.newMiddleBanner = newMiddleBanner;