const express = require('express')
const router = express()
const Post = require('../models/post')

router.get("", (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: get post")
  })
});

router.delete("/:id", (req, res, next) => {  
  Post.deleteOne({_id: req.params.id}).then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: delete post")
  })
});

module.exports = router