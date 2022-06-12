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

app.use(express.json());

app.use((req, res, next) => {
    res.send('her')
})

module.exports = app
