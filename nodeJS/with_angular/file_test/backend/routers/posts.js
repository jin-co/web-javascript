const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.get("", (req, res, next) => {
  Post.find().then((data) => {
    res.status(200).json(data);
  });
});

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((data) => {
    res.status(200).json(data);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json(data);
  });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id)
  Post.findById(req.params.id).then((data) => {
      console.log(data)
    res.status(200).json(data);
  });
});

router.put("/:id", (req, res, next) => {  
  const post = new Post ({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath
  })
  Post.updateOne({_id: req.params.id}, post).then((data) => {
      console.log(data)
    res.status(200).json(data);
  });
});

module.exports = router;
