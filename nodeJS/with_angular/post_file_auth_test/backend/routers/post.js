const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const authCheck = require("../middlewares/check-auth");

// file upload
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
    console.log("multer: ", file);
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
// file upload

router.get("", (req, res, next) => {
  Post.find().then((result) => {
    res.status(200).json(result);
  });
});

router.post(
  "",
  authCheck,
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

router.delete("/:id", authCheck, (req, res, next) => {
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
  authCheck,
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
