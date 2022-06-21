const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, PATCH, DELETE, POST, GET, OPTIONS"
  );

  next();
});

app.use(express.json());

const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
const Post = mongoose.model("Post", postSchema);
const dbURL = "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));
app.get("/posts", (req, res, next) => {
  Post.find().then(posts => {
    console.log('back get: ')
    console.log(posts)
    res.status(200).json(posts)
  })
});

module.exports = app;
