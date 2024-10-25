

const express = require('express');
const router = express();
const {check}=require("express-validator")

const mainSliderCtrl = require("../controllers/mainSliderCtrl");

router.get("/main-slider", mainSliderCtrl.getAllMainSlider);
router.post("/new-main-slider",[check("imageAlt","حداقل تعداد کرکتر آلت باید 8 کرکتر باشد").isLength({min:8})], mainSliderCtrl.newMainSlider);
router.get("/get-single-main-slider/:id", mainSliderCtrl.getSingleMainSlider);
router.post("/update-main-slider/:id",[check("imageAlt","حداقل تعداد کرکتر آلت باید 8 کرکتر باشد").isLength({min:8})], mainSliderCtrl.updateMainSlider);
router.post("/delete-main-slider/:id", mainSliderCtrl.deleteMainSlider);
router.get("/get-active-main-slider", mainSliderCtrl.getActiveMainSlider);


module.exports = router;