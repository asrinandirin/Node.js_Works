const Post = require("../models/Post")
const fs = require("fs");

exports.getMainPage = async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts,
    })
}

exports.getPostPage = async (req, res) => {
    console.log(req.params.id)
    const post = await Post.findById(req.params.id)
    console.log(req.body)
    res.render('post', {
        post,
    })
}

exports.createPost = async (req, res) => {
    console.log(req.body)
    await Post.create(req.body)
    res.redirect('/')
}
