


const express = require('express');
const router = express();

const postCtrl = require("../controllers/postCtrl");



router.get("/posts", postCtrl.getAllPost);
router.get("/posts-rel", postCtrl.getRelPosts);
router.post("/new-post", postCtrl.newPost);
router.post("/update-post/:id", postCtrl.updatePost);
router.post("/delete-post/:id", postCtrl.deletePost);
router.get("/get-single-post/:slug", postCtrl.getSinglePost);
router.get("/get-active-posts", postCtrl.getActivePosts);
router.get("/get-blog-page", postCtrl.getBlogPage);
router.get("/get-most-view-blog", postCtrl.getMostViewBlog);
router.post("/post-related-posts", postCtrl.postRelatedPosts);



module.exports = router;