const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

//** image upload path
const path = require('path');
const bodyParser = require("body-parser");
app.use("/images", express.static(path.join("backend/images")))
//** image upload path

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

app.use(bodyParser.json())
app.use("/posts", postRouter);
app.use("/user", userRouter);

module.exports = app;