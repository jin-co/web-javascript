const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("connection failed"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Context-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

const Post = require('./models/post')
app.get("/posts", (req, res, next) => {
  Post.find().then(posts => {
    res.status(200).json(posts)
  })
});

module.exports = app;
