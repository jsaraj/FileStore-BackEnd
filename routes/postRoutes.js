


const express = require('express');
const router = express();

const {check}=require("express-validator")

const postCtrl = require("../controllers/postCtrl");



router.get("/posts", postCtrl.getAllPost);
router.get("/posts-rel", postCtrl.getRelPosts);

router.post("/new-post",[check("imageAlt","تعداد کارارکتر آلت باید بیشتر از 5 کاراکتر باشد").isLength({min:5})], postCtrl.newPost);

router.post("/update-post/:id",[check("imageAlt","تعداد کارکتر آلت باید بیشتر از 5 کرکتر باشد").isLength({min:5})], postCtrl.updatePost);

router.post("/delete-post/:id", postCtrl.deletePost);
router.get("/get-single-post/:slug", postCtrl.getSinglePost);
router.get("/get-active-posts", postCtrl.getActivePosts);
router.get("/get-blog-page", postCtrl.getBlogPage);
router.get("/get-most-view-blog", postCtrl.getMostViewBlog);
router.post("/post-related-posts", postCtrl.postRelatedPosts);


module.exports = router;