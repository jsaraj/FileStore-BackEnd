
const postModel = require("../models/postModel");
const { validationResult } = require("express-validator");

const getAllPost = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const goalPost = await postModel.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate);
            const allGoalPost = await (await postModel.find()).length;
            res.status(200).json({ goalPost, allGoalPost })
        } else {
            const allPost = await postModel.find().sort({ _id: -1 });
            res.status(200).json(allPost);
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get All Post...." })
    }
}

module.exports.getAllPost = getAllPost;


const getRelPosts = async (req, res) => {
    try {

        const allPost = await postModel.find().select({ title: 1, realtedPost: 1 });
        res.status(200).json(allPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get All Post...." })
    }
}

module.exports.getRelPosts = getRelPosts;


const newPost = async (req, res) => {
    try {


        //validation 
        const err = validationResult(req);
        if (err.isEmpty()) {
            const data = req.body
            data.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
            if (req.body.imageUrl.endsWith(".png") ||
                req.body.imageUrl.endsWith(".jpg") ||
                req.body.imageUrl.endsWith(".jpeg") ||
                req.body.imageUrl.endsWith(".svg") ||
                req.body.imageUrl.endsWith(".webp")) {
                await postModel.create(data);
                res.status(200).json({ msg: "پست با موفقیت ذخیره شد" });
            }
            else {
                res.status(422).json({ msg: "فرمت عکس ایراد دارد" })
            }
        } else {
            console.log(err)
            res.status(422).json({ msg: "ایراد دارد" })
        }


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in New Post" })
    }
}

module.exports.newPost = newPost;



const deletePost = async (req, res) => {
    try {
        await postModel.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "پست با موفقیت حذف شد" });

        // await postModel.deleteOne(
        //     { _id: req.body.goalId }
        // )

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Delete Post" })
    }
}

module.exports.deletePost = deletePost;



const getSinglePost = async (req, res) => {

    try {
        const goalSinglePost = await postModel.findOne({ slug: req.params.slug })


        //Add +1 To page View
        const newPost = {
            pageView: goalSinglePost.pageView + 1
        }
        await postModel.findByIdAndUpdate(goalSinglePost._id, newPost, { new: true });
        res.status(200).json(goalSinglePost);
    }

    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in get Single Post" })
    }
}

module.exports.getSinglePost = getSinglePost;



const updatePost = async (req, res) => {
    try {

        //validation
        const err = validationResult(req)
        if (err.isEmpty()) {
            if (req.body.imageUrl.endsWith(".png") ||
                req.body.imageUrl.endsWith(".jpg") ||
                req.body.imageUrl.endsWith(".jpeg") ||
                req.body.imageUrl.endsWith(".svg") ||
                req.body.imageUrl.endsWith(".webp")) {
                const data = req.body
                data.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
                await postModel.findByIdAndUpdate(req.params.id, data, { new: true });
                res.status(200).json({ msg: "پست با موفقیت بروزرسانی شد" });
            }
            else {
                res.status(422).json({ msg: "فرمت عکس ایراد دارد" })
            }
        } else {
            res.status(422).json({ msg: "ایراد دارد" })
        }


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Update Post" })
    }
}

module.exports.updatePost = updatePost;



const getActivePosts = async (req, res) => {

    try {
        const goalActivePost = await postModel.find({ published: true }).sort({ _id: -1 }).limit(4).select({ title: 1, slug: 1, updatesAt: 1, imageUrl: 1, shortDesc: 1, imageAlt: 1, pageView: 1, type: 1 })
        res.status(200).json(goalActivePost);
    }

    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in get Active Post" })
    }
}

module.exports.getActivePosts = getActivePosts;





const getBlogPage = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const goalPost = await postModel.find({ published: true }).sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ title: 1, slug: 1, updatesAt: 1, imageUrl: 1, shortDesc: 1, imageAlt: 1, pageView: 1, type: 1 });
            const allGoalPost = await (await postModel.find({ published: true })).length;
            res.status(200).json({ goalPost, allGoalPost })
        } else {
            const allPost = await postModel.find({ published: true }).sort({ _id: -1 });
            res.status(200).json(allPost);
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get All Blog page Post...." })
    }
}

module.exports.getBlogPage = getBlogPage;



const getMostViewBlog = async (req, res) => {
    try {

        const goalPost = await postModel.find({ published: true }).sort({ pageView: -1 }).limit(4).select({ title: 1, slug: 1, pageView: 1 });
        res.status(200).json(goalPost)

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Get Mosted View Blog page Post...." })
    }
}

module.exports.getMostViewBlog = getMostViewBlog;



const postRelatedPosts = async (req, res) => {
    try {
        const goalId = req.body.goalId;
        const goalPost = await postModel.find({ _id: goalId }).select({ title: 1, slug: 1, updatesAt: 1, imageUrl: 1, shortDesc: 1, imageAlt: 1, pageView: 1, type: 1 });
        res.status(200).json(goalPost)

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in post Related Post...." })
    }
}

module.exports.postRelatedPosts = postRelatedPosts;