const express = require("express");
const Post = require("../models/post");
const authCheck = require('../middlewares/auth.check')
const fileCheck = require('../middlewares/file.check')
const router = express.Router();

router.get("", (req, res, next) => {
  Post.find().then((result) => {
    res.status(200).json(result);
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

router.post("", authCheck, fileCheck, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    auth: req.userData.userId
  });
  post.save().then((result) => {
    res.status(200).json(result);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json(result);
  });
});

router.put("/:id", authCheck, (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id, auth: req.userData.userId }, post).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
