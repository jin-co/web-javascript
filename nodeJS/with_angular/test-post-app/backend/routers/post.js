const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get("", (req, res, next) => {
  Post.find().then(posts => {    
    res.status(200).json(posts)
  })
});

router.post("", (req, res, next) => {
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(result => {
    res.status(201).json(result)
  })
})


module.exports = router