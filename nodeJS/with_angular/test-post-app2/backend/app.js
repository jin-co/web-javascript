const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
const Post = mongoose.model("Post", postSchema)
const DB_URL = 'mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority'
mongoose.connect(DB_URL).then(() => console.log('connected')).catch(() => console.log('failed'))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, DELETE, POST, PUT, PATCH, OPTIONS"
  );

  next();
});

app.use(express.json());

app.get("/posts", (req, res, next) => {
  Post.find().then(result => {
    res.status(200).json(result)
  })
})

module.exports = app;
