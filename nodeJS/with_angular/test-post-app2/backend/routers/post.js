const express = require("express");
const Post = require("../models/post");
const authCheck = require("../middlewares/auth.check");
const fileCheck = require("../middlewares/file.check");
const router = express.Router();

router.get("", (req, res, next) => {
  const size = req.query.size
  const current = req.query.current
    console.log(size)
    console.log(current)    
  const postQuery = Post.find()
  let fetchedPost

  if(size && current) {
    postQuery.skip(size * (current - 1)).limit(size)
  }  

  postQuery.then(posts => {
    fetchedPost = posts
    return Post.count()
  }).then(count => {
    res.status(200).json({posts: fetchedPost, count:count});
  })  
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});

router.post("", authCheck, fileCheck, (req, res, next) => {  
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    auth: req.userData.userId,
    imagePath: url + "/images/" + req.file.filename,
  });
  post.save().then((result) => {
    res.status(200).json(result);
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json(result);
  });
});

router.put("/:id", authCheck, (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id, auth: req.userData.userId }, post).then(
    (result) => {
      res.status(200).json(result);
    }
  );
});

module.exports = router;
