const express = require("express");
const Post = require("../models/post");
const bodyParser = require("body-parser");
const app = express();
//**auth check */
const checkAuth = require("../middleware/check-auth");
//middleware runs in order so put the auth part right after the path and before all the other functions
//**auth check */

//**file upload
const extractFile = require('../middleware/file')
// const multer = require("multer");
// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg",
// };
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images"); // path here is relative to the server file
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(" ").join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   },
// });
//**file upload

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post(
  "",
  checkAuth,
  jsonParser,
  // multer({ storage: storage }).single("image"),
  extractFile,
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      auth: req.userData.userId,
    });
    post.save().then((result) => {
      res.status(201).json({
        message: "post added",
        // postId: result._id,
        post: {
          // _id: result._id,
          // title: result.title,
          // content: result.console,
          // imagePath: result.imagePath

          ...result,
          _id: result._id,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedPost;
  postQuery
    .then((docs) => {
      fetchedPost = docs;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "post",
        posts: fetchedPost,
        postCount: count,
      });
    })
    .catch();
  // Post.find()
  //   .then((docs) => {
  //     console.log(docs);
  //     res.status(200).json({
  //       message: "post",
  //       posts: docs,
  //     });
  //   })
  //   .catch();
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, auth: req.userData.userId }).then(
    (result) => {
      if (result.n > 0) {
        res.status(200).json("deleted");
      } else {
        res.status(401).json("not the user");
      }
    }
  );
});

router.put(
  "/:id",
  checkAuth,
  jsonParser,
  // multer({ storage: storage }).single("image"),
  extractFile,
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
      auth: req.userData.userId
    });

    Post.updateOne(
      { _id: req.params.id, auth: req.userData.userId },
      post
    ).then((result) => {
      if (result.nModified > 0) {
        res.status(200).json("updated");
      } else {
        res.status(401).json("not the user");
      }
    });
  }
);

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((p) => {
    if (p) {
      res.status(200).json(p);
    } else {
      res.status(404).json("post not found");
    }
  });
});

module.exports = router;
