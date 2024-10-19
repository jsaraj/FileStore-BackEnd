
const middleBannerModel = require("../models/middleBannerModel");


const getAllMidBanner = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const goalMidBanner = await middleBannerModel.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate);
            const allGoalMidBan = await (await middleBannerModel.find()).length;
            res.status(200).json({ goalMidBanner, allGoalMidBan })
        } else {
            const allMidBanner = await middleBannerModel.find().sort({ _id: -1 });
            res.status(200).json(allMidBanner);
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get All Middle Banner...." })
    }
}

module.exports.getAllMidBanner = getAllMidBanner;


const newMiddleBanner = async (req, res) => {
    try {
        if (req.body.image.endWith(".png") ||
            req.body.image.endWith(".jpg") ||
            req.body.image.endWith(".jpeg") ||
            req.body.image.endWith(".svg") ||
            req.body.image.endWith(".webp")) {
            await middleBannerModel.create(req.body);
            res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });
        }
        else {
            res.status(422).json({ msg: "فرمت عکس ایراد دارد" })
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in New Middle Banner" })
    }
}

module.exports.newMiddleBanner = newMiddleBanner;



const deleteMiddleBanner = async (req, res) => {
    try {
        await middleBannerModel.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "بنر با موفقیت حذف شد" });


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Delete Middle Banner" })
    }
}

module.exports.deleteMiddleBanner = deleteMiddleBanner;



const getSingleMiddleBanner = async (req, res) => {

    try {
        const goalSingleMidBan = await middleBannerModel.findById(req.params.id)
        res.status(200).json(goalSingleMidBan);
    }

    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in get Single Middle Banner" })
    }
}

module.exports.getSingleMiddleBanner = getSingleMiddleBanner;



const updateMiddleBanner = async (req, res) => {
    try {
        if (req.body.image.endWith(".png") ||
            req.body.image.endWith(".jpg") ||
            req.body.image.endWith(".jpeg") ||
            req.body.image.endWith(".svg") ||
            req.body.image.endWith(".webp")) {
            await middleBannerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ msg: "بنر با موفقیت بروزرسانی شد" });
        }
        else {
            res.status(422).json({ msg: "فرمت عکس ایراد دارد" })
        }


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Update Middle Banner" })
    }
}

module.exports.updateMiddleBanner = updateMiddleBanner;



const getActiveMiddleBanner = async (req, res) => {

    try {

        const goalActiveMidBan = await middleBannerModel.find({ imageStatus: true }).select({ imageUrl: 1, imageAlt: 1, imageLink: 1 })
        res.status(200).json(goalActiveMidBan);
    }

    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in get Active Middle Banner" })
    }
}

module.exports.getActiveMiddleBanner = getActiveMiddleBanner;