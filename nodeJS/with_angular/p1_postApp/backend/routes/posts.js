const express = require("express");
const Post = require('../models/post')
const bodyParser = require("body-parser");
const app = express();

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.post("", jsonParser, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "post added",
      postId: result._id,
    });
  });
});

router.get("", (req, res, next) => {
  Post.find()
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        message: "post",
        posts: docs,
      });
    })
    .catch();
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json("deleted");
  });
});

router.put("/:id", jsonParser, (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json("updated");   
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((p) => {
    if (p) {
      res.status(200).json(p);
    } else {
      res.status(404).json("post not found");
    }
  });
});

module.exports = router