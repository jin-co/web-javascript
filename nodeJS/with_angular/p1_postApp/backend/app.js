const express = require("express");


const app = express();


// app.use((req, res, next) => {
//     next()
// })

// app.use((req, res, next) => {
//     res.send("heih")
// })

// dealing with CORS error
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

app.post('/posts', (req, res, next) => {
    const post = req
    console.log(post)
    res.status(201).json({
        message: 'post added'
    })
})

app.get("/posts", (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: "hi",
      content: "me",
    },
  ];
  res.status(200).json({
    message: "post",
    posts: posts,
  });
});

module.exports = app;
