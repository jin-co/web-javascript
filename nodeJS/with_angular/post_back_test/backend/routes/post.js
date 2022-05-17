const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//**file upload
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
    cb(null, name);
  },
});
//**/file upload

// router.get("", (req, res, next) => {
//   Post.find().then((data) => {
//     res.status(200).json(data);
//   });
// });

router.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json(data);
  });
});

//** paginator */
router.get("", (req, res, next) => {
  const pageSize = req.query.pageSize;
  const currentPage = req.query.currentPage;
  const postQuery = Post.find();
  let fetchedPosts
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  Post.find().then((data) => {
    fetchedPosts = data
    res.status(200).json(data);
  }).then((count) => {
    res.status(200).json({
      posts: fetchedPosts,
      maxPage: count
    });
  })
});
//** paginator */

// router.post("", jsonParser, (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   post.save().then((data) => {
//     res.status(201).json(data);
//   });
// });

router.post(
  "",
  jsonParser,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then((data) => {
      res.status(201).json(data);
    });
  }
);

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json("deleted");
  });
});

// router.put("/:id", jsonParser, (req, res, next) => {
//   console.log(req.body);
//   const post = new Post({
//     _id: req.body._id,
//     title: req.body.title,
//     content: req.body.content,
//   });

//   Post.updateOne({ _id: req.params.id }, post).then((data) => {
//     res.status(200).json(data);
//   });
// });

router.put(
  "/:id",
  jsonParser,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.body);
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

    Post.updateOne({ _id: req.params.id }, post).then((data) => {
      res.status(200).json(data);
    });
  }
);

module.exports = router;
