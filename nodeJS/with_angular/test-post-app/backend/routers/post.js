const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authCheck = require("../middlewares/check-auth");
const fileCheck = require("../middlewares/file");

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

router.post("", authCheck, fileCheck, (req, res, next) => {
  console.log("post: ")
  console.log(req.userData)
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: "",
    auth: req.userData.userId,
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

router.put("/:id", authCheck, (req, res, next) => {
  console.log("userData");
  console.log(req.userData);
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    auth: req.userData.userId,
  });

  Post.updateOne({ _id: req.params.id, auth: req.userData.userId }, post).then(
    (result) => {
      res.status(200).json(result);
    }
  );
});

module.exports = router;
