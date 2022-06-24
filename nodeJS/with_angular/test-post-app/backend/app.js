const express = require("express");
const app = express();
const postRouter = require("./routers/post");
const authRouter = require("./routers/auth");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, PATCH, DELETE, POST, GET, OPTIONS"
  );

  next();
});

app.use(express.json());

// file
const path = require("path");
app.use("/images", express.static(path.join("backend/images")));
// file

const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use("/posts", postRouter);
app.use("/auth", authRouter);

module.exports = app;
