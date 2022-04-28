const express = require("express");

const app = express();
// app.use((req, res, next) => {
//     next()
// })

// app.use((req, res, next) => {
//     res.send("heih")
// })

app.use("/posts", (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: "hi",
      content: "me",
    },
  ];
  res.status(200).json({
      message: 'post',
      posts: posts
  });
});

module.exports = app;
