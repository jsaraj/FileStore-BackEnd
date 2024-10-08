


const express = require('express');
const router = express();

const postCtrl = require("../controllers/postCtrl");



router.get("/posts", postCtrl.getAllPost);
router.post("/new-post", postCtrl.newPost);
router.post("/update-post/:id", postCtrl.updatePost);
router.post("/delete-post/:id", postCtrl.deletePost);
router.get("/get-single-post/:slug", postCtrl.getSinglePost);
router.get("/get-active-posts", postCtrl.getActivePosts);


module.exports = router;