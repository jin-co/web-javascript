const express = require("express");
const app = express();
const router = require('./routers/posts')
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlEncodedParder = bodyParser.urlencoded({ extended: false });

const dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
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
    "GET, PUT, DELETE, FETCH, POST, OPTIONS"
  );
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/posts", router)

module.exports = app;
