const express = require("express");
const Post = require('../models/post')
const bodyParser = require("body-parser");
const app = express();

//file upload
const multer = require('multer')
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error("Invalid mime type")
    if(isValid) {
      error = null
    }
    cb(error, "backend/images")
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    cb(null, name + '-' + Date.now() + '.' + ext)
  }
})

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.post("", jsonParser, multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host")
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
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
        _id: result._id
      }
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