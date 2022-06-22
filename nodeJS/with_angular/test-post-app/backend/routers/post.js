const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json(posts);
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    res.status(200).json(post);
  });
});

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json(result);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json(result);
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
