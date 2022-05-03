const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: String,
  content: String,
});
const post = mongoose.model("Post", postSchema);
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/posts?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected to db"))
  .catch(() => console.log("connection failed"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, FETCH, POST, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use((req, res, next) => {
  res.send("hsi");
});

module.exports = app;
