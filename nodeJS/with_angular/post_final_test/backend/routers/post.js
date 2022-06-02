const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authCheck = require('../middleware/auth-check')

router.get("", (req, res, next) => {
  Post.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("", authCheck, (req, res, next) => {
  console.log("post create")
  console.log(req.userData)
  const post = new Post({
    title: req.body.title,
    content: req.body.content,    
    author: req.userData.userId
  });
  console.log("post save")
  console.log(post)
  post
    .save()
    .then((result) => {      
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log('save failed')
      res.status(401).json(err);
    });
});

router.delete("/:id", authCheck, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, author: req.userData.userId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.put("/:id", authCheck, (req, res, next) => {
  console.log('============== user dataS =============')
  console.log(req.userData)
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id, author: req.userData.userId }, post).then((result) => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).json(err)
  })
});

module.exports = router;
