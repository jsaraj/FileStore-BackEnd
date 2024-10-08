


const express = require('express');
const router = express();

const middleBannerCtrl = require("../controllers/middleBannerCtrl");



router.get("/middle-banner", middleBannerCtrl.getAllMidBanner);
router.post("/new-middle-banner", middleBannerCtrl.newMiddleBanner);
router.post("/update-middle-banner/:id", middleBannerCtrl.updateMiddleBanner);
router.post("/delete-middle-banner/:id", middleBannerCtrl.deleteMiddleBanner);
router.get("/get-single-middle-banner/:id", middleBannerCtrl.getSingleMiddleBanner);
router.get("/get-active-middle-banner", middleBannerCtrl.getActiveMiddleBanner);


module.exports = router;