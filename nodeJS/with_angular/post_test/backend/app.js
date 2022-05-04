const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const postSchema = mongoose.Schema({
  title: String,
  content: String,
});

var dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected to db"))
  .catch(() => console.log("connection failed"));

const Post = mongoose.model("Post", postSchema);

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
  Post.find((err, result) => {
    if (!err) {
      res.json(result);
    }
  });
  //   Post.find().then((docs) => {
  //       console.log(docs)
  //     res.status(200).json(docs);
  //   });
});

app.post("/posts", jsonParser, (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    console.log(result);
    res.status(201).json("added");
  });
});

module.exports = app;
