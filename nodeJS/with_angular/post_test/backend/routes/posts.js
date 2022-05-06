const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const Post = require("../models/Post");

router.get("", (req, res, next) => {
  Post.find().then((result) => {
    res.json(result);
  });
});

router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((result) => {
    res.json(result);
  });
});

router.post("", jsonParser, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json(result);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id,
  }).then((result) => {
    res.status(200).json("Post Deleted");
  });
});

router.put("/:id", jsonParser, (req, res, next) => {  
  console.log("back put", req.body);
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json("update");
  });
});

module.exports = router;
