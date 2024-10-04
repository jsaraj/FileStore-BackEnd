


const express = require('express');
const router = express();

const middleBannerCtrl = require("../controllers/middleBannerCtrl");



router.get("/middle-banner", middleBannerCtrl.getAllMidBanner);
router.post("/new-middle-banner", middleBannerCtrl.newMiddleBanner);
router.post("/update-middle-banner", middleBannerCtrl.updateMiddleBanner);
router.post("/delete-middle-banner", middleBannerCtrl.deleteMiddleBanner);


module.exports = router;