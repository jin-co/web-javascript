const { urlencoded } = require("express");
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
    "POST, GET, DELETE, PUT, FETCH, OPTIONS"
  );
  next()
});

app.use(express.json())
app.use(urlencoded({extended: false}))

module.exports = app;
