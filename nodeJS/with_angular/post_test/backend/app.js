const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, FETCH, OPTIONS, DELETE"
  );
  next()
});

app.use((req, res, next) => {
    res.send('up')
})

app.get("/posts", (req, res, next) => {

})

module.exports = app
