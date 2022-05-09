const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
const Post = require('../backend/models/post')
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/posts?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, FETCH, DELETE, OPTIONS"
  );

  next();
});

app.use((req, res, next) => {
  res.send("hvhvhvh");
});
module.exports = app;
