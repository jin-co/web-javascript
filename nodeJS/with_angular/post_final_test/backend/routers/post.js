const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authCheck = require('../middleware/auth-check')

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.get("", (req, res, next) => {
  Post.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("", authCheck, multer({storage:storage}).single('image'), (req, res, next) => {
  console.log("post create")
  console.log(req.userData)
  const url = req.protocol + "://" + req.get('host')
  const post = new Post({
    title: req.body.title,
    content: req.body.content, 
    imagePath: url + "/images/" + req.file.filename,
    author: req.userData.userId    
  });
  console.log("post save")
  console.log(post)
  post
    .save()
    .then((result) => {      
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log('save failed')
      res.status(401).json(err);
    });
});

router.delete("/:id", authCheck, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, author: req.userData.userId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.put("/:id", authCheck, multer({storage:storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath
  if(req.file) {
    const url = req.protocol + "://" + req.get('host')
    imagePath = url + "/images/" + req.file.filename
  }

  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({ _id: req.params.id, author: req.userData.userId }, post).then((result) => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).json(err)
  })
});

module.exports = router;
