const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//**file upload
const multer = require('multer')
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(MIME_TYPE_MAP[file.mimetype], "backend/images")
  }
})


//**/file upload

router.get("", (req, res, next) => {
  Post.find().then((data) => {
    res.status(200).json(data);
  });
});

router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json(data);
  });
});

router.post("", jsonParser, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((data) => {
    res.status(201).json(data);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json("deleted");
  });
});

router.put("/:id", jsonParser, (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = router;
