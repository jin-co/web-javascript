const express = require('express')
const router = express()
const Post = require('../models/post')
const authCheck = require('../middlewares/auth-check')
const fileCheck = require('../middlewares/file-check')

router.get("", (req, res, next) => {
  console.log(req.query)

  let fetchedPost
  const pageSize = req.query.pageSize
  const currentPage = req.query.currentPage

  const postQuery = Post.find()

  if(pageSize) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
  }

  postQuery.then(post => {
    fetchedPost = post
    return Post.count()
  }).then(count => {
    console.log(count)
    res.status(200).json({posts: fetchedPost, count: count})
  }).catch(err => {
    res.status(400).json(err)
  })
  // Post.find().then(posts => {
  //   res.status(200).json(posts)
  // }).catch((err) => {
  //   res.status(400).json("Error: get post")
  // })
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: get post")
  })
});

router.post("", authCheck, fileCheck, (req, res, next) => {  
  const url = req.protocol + "://" + req.get('host')
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + req.file.filename,
    auth: req.userData.userId
  })
  post.save().then(posts => {
    res.status(200).json(posts)
  }).catch((err) => {
    res.status(400).json("Error: delete post")
  })
});

router.put("/:id", authCheck, fileCheck, (req, res, next) => { 
  console.log(req.userData) 
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  })
  Post.updateOne({_id: req.params.id, auth: req.userData.userId}, post).then(posts => {
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