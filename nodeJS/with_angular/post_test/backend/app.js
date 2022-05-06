const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/posts?retryWrites=true&w=majority";
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
const Post = mongoose.model("Post", postSchema);

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
    "POST, PUT, DELETE, OPTIONS, FETCH, GET"
  );

  next();
});

app.get("/posts", (req, res, next) => {
  Post.find().then(result => {
      res.status(200).json(result)
  })
});

module.exports = app;
