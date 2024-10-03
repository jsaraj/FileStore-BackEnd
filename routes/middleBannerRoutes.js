


const express = require('express');
const router = express();

const middleBannerCtrl = require("../controllers/middleBannerCtrl");



router.get("/middle-banner", middleBannerCtrl.getAllMidBanner);
router.post("/new-middle-banner", middleBannerCtrl.newMiddleBanner);


module.exports = router;