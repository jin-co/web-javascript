const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const Post = require("./models/Post");
const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.get("/posts", (req, res, next) => {
  Post.find().then((result) => {
    res.json(result);
  });
});

app.post("/posts", jsonParser, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json(result);
  });
});

app.delete("/posts/:id", (req, res, next) => {  
  Post.deleteOne({
    _id: req.params.id,
  }).then((result) => {
    res.status(200).json("Post Deleted");
  });
});

app.put("/posts/:id", jsonParser, (req, res, next) => {
    console.log('back put', req.body)
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({
        _id: req.params.id
    }, post).then(result => {
        res.status(200).json("update")
    })
})

module.exports = app;
