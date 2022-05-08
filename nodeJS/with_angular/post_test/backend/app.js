const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
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
  Post.find().then((data) => {
    res.status(200).json(data);
  });
});

app.get("/posts/:id", jsonParser, (req, res, next) => {});

app.post("/posts", jsonParser, (req, res, next) => {
  
});

app.delete("/posts/:id", jsonParser, (req, res, next) => {});

app.put("/posts/:id", jsonParser, (req, res, next) => {});


module.exports = app;
