const express = require("express");
const postRouter = require("./routers/post");
const app = express();

//image
const path = require("path");
app.use("/images", express.static(path.join("backend/images")));
//image

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, DELETE, POST, PATCH, OPTIONS, GET"
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

app.use(express.json());

app.use("/posts", postRouter);

module.exports = app;
