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
    "PUT, DELETE, POST, FETCH, OPTIONS"
  );
  next();
});

const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema)

app.use(express.json());

app.use("/posts", (req, res, next) => {
  Post.find().then(result => {
    res.status(200).json(result)
  })
});

module.exports = app;
