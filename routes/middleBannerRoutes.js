


const express = require('express');
const router = express();
const {check}=require("express-validator")

const middleBannerCtrl = require("../controllers/middleBannerCtrl");



router.get("/middle-banner", middleBannerCtrl.getAllMidBanner);

router.post("/new-middle-banner",[check("imageAlt","حداقل تعداد کرکتر آلت باید 8 کرکتر باشد").isLength({min:8})], middleBannerCtrl.newMiddleBanner);
router.post("/update-middle-banner/:id",[check("imageAlt","حداقل تعداد کرکتر آلت باید 8 کرکتر باشد").isLength({min:8})], middleBannerCtrl.updateMiddleBanner);
router.post("/delete-middle-banner/:id", middleBannerCtrl.deleteMiddleBanner);
router.get("/get-single-middle-banner/:id", middleBannerCtrl.getSingleMiddleBanner);
router.get("/get-active-middle-banner", middleBannerCtrl.getActiveMiddleBanner);


module.exports = router;