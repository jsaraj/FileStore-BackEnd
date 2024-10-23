
const MainSliderModel=require("../models/mainSliderModel");
const { validationResult } = require("express-validator");


const getAllMainSlider = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const goalMainSlider = await MainSliderModel.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate);
            const allGoalMainSlider = await (await MainSliderModel.find()).length;
            res.status(200).json({ goalMainSlider, allGoalMainSlider })
        } else {
            const allMainSlider = await MainSliderModel.find().sort({ _id: -1 });
            res.status(200).json(allMainSlider);
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get All Main Slider...." })
    }
}

module.exports.getAllMainSlider = getAllMainSlider;



const newMainSlider = async (req, res) => {
    try {

        //validation
        const err = validationResult(req);
        if (err.isEmpty()) {
            if (req.body.imageSrc.endsWith(".png") ||
                req.body.imageSrc.endsWith(".jpg") ||
                req.body.imageSrc.endsWith(".jpeg") ||
                req.body.imageSrc.endsWith(".svg") ||
                req.body.imageSrc.endsWith(".webp")) {
                await MainSliderModel.create(req.body);
                res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });
            }
            else {
                res.status(422).json({ msg: "فرمت عکس ایراد دارد" })
            }
        } else {
            res.status(422).json({ msg: "الت عکس ایراد دارد" })
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in New Main Slider" })
    }
}

module.exports.newMainSlider = newMainSlider;