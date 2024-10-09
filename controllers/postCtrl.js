
const postModel = require("../models/postModel");


const getAllPost = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const goalPost = await postModel.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate);
            const allGoalPost = await (await postModel.find()).length;
            res.status(200).json({ goalPost, allGoalPost })
        } else {
            const allPost = await postModel.find();
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

        const allPost = await postModel.find().select({ title: 1 });
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
        await postModel.create(req.body);
        res.status(200).json({ msg: "پست با موفقیت ذخیره شد" });

        // const newPost = new postModel({
        //     imageUrl: req.body.imageUrl,
        //     imageAlt: req.body.imageAlt,
        //     imageLink: req.body.imageLink,
        //     imageStatus: req.body.imageStatus,
        //     publishDate: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        // })

        // newPost.save()
        //     .then(d => {
        //         res.status(200).json({ msg: "بنر با موفقیت ذخیره شد" });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(200).json({ msg: "خطا در دریافت اطلاعات" })
        //     })
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

        await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ msg: "پست با موفقیت بروزرسانی شد" });

        // await postModel.updateOne(
        //     { _id: req.body.goalId },
        //     {
        //         $set: {
        //             imageUrl: req.body.imageUrl,
        //             imageAlt: req.body.imageAlt,
        //             imageLink: req.body.imageLink,
        //             imageStatus: req.body.imageStatus,
        //             publishDate: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        //         }
        //     }
        // )
        // res.status(200).json({ msg: "بنر با موفقیت بروزرسانی شد" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in Update Post" })
    }
}

module.exports.updatePost = updatePost;



const getActivePosts = async (req, res) => {

    try {
        const goalActivePost = await postModel.find().select({ title: 1, slug: 1, updatesAt: 1, imageUrl: 1, shortDesc: 1, imageAlt: 1, pageView: 1, type: 1 })
        res.status(200).json(goalActivePost);
    }

    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error in get Active Post" })
    }
}

module.exports.getActivePosts = getActivePosts;