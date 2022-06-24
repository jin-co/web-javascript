const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authCheck = require("../middlewares/check-auth");
const fileCheck = require("../middlewares/file");
const file = require("../middlewares/file");

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
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
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

router.put("/:id", authCheck, fileCheck, (req, res, next) => {  
  let imagePath = req.body.imagePath;
  const url = req.protocol + "://" + req.get("host");
  if (file) {
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    auth: req.userData.userId,
  });

  Post.updateOne({ _id: req.params.id, auth: req.userData.userId }, post).then(
    (result) => {      
      res.status(200).json(result);
    }
  );
});

module.exports = router;
