

const express = require('express');
const router = express();
const {check}=require("express-validator")

const mainSliderCtrl = require("../controllers/mainSliderCtrl");

router.get("/main-slider", mainSliderCtrl.getAllMainSlider);
router.post("/new-main-slider",[check("imageAlt","حداقل تعداد کرکتر آلت باید 8 کرکتر باشد").isLength({min:8})], mainSliderCtrl.newMainSlider);




module.exports = router;