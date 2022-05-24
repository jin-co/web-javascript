const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");

// file upload
const multer  
// file upload

router.get("", (req, res, next) => {
  Post.find().then((result) => {
    res.status(200).json(result);
  });
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log("image add post", req.file);
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then((result) => {
      res.status(201).json(result);
    });
  }
);

router.delete("/:id",  (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json("deleted");
  });
});

router.get("/:id", (req, res, next) => {
  console.log("back get post id: ", req.params.id);
  Post.findOne({ _id: req.params.id }).then((result) => {
    console.log("back get post result: ", result);
    res.status(200).json(result);
  });
});

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
    });
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
      res.status(200).json(result);
    });
  }
);

module.exports = router;
