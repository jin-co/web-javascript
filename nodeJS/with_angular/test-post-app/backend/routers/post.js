const express = require('express')
const router = express()
const Post = require('../models/post')
const authCheck = require('../middlewares/auth-check')

router.get("", authCheck, (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: get post")
  })
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: get post")
  })
});

router.post("", authCheck, (req, res, next) => {  
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  })
  post.save().then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: delete post")
  })
});

router.put("/:id", (req, res, next) => {  
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  })
  Post.updateOne({_id: req.params.id}, post).then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: delete post")
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