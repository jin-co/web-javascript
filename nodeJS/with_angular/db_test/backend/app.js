const express = require("express");
const bodyParser = require("body-parser");

//db
const mongoose = require("mongoose");
var dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
const Post = require("./models/post");

var jsonParser = bodyParser.json();
const app = express();

mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

let posts = [
  { id: "1", title: "tom", content: "jack" },
  { id: "2", title: "tom", content: "jack" },
  { id: "3", title: "tom", content: "jack" },
];

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

app.post("/posts", jsonParser, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json(posts);
});

app.get("/posts", (req, res, next) => {
  Post.find().then((docs) => {
    res.json(docs);
  });
});

module.exports = app;
