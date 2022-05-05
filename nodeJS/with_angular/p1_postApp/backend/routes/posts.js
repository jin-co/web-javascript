const express = require("express");
const router = express.Router();

router.post("/posts", jsonParser, (req, res, next) => {
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

router.get("/posts", (req, res, next) => {
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

router.delete("/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json("deleted");
  });
});

router.put("/posts/:id", jsonParser, (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json("updated");
    const updatedPost = [...this.posts];
    const oldPostIndex = updatedPost.findIndex((p) => p._id === post._id);
    updatedPost[oldPostIndex] = post;
    this.posts = updatedPost;
    this.updatedPost.next([...this.posts]);
  });
});

router.get("/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((p) => {
    if (p) {
      res.status(200).json(p);
    } else {
      res.status(404).json("post not found");
    }
  });
});
