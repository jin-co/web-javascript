const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//image
const multer = require('multer')
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error('invalid')
    if(isValid) {
      error = null
    }
    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    cb(null, name + '-' + Date() + '.' + ext)
  }
})
//image

router.get("", (req, res, next) => {
  console.log("back get post: ");
  Post.find().then((result) => {
    res.status(200).json(result);
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

router.post("", multer({storage:storage}).single('image'), (req, res, next) => {
  console.log(file)
  const url = req.protocol + '://' + req.get.host
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
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
