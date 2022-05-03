const express = require("express");
const Post = require("./models/post");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var dbURL =
  "mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected"))
  .catch(() => console.log("connection fail"));

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

app.post("/posts", jsonParser, (req, res, next) => {
  console.log('request', req.body.title, req.body.connect, req.body)
  // const post = req
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log('post', post);
  // post.save() //insert to DB
  post.save().then(result => {
    res.status(201).json({
      message: "post added",
      postId: result._id
    });
  })

  // res.status(201).json({
  //   message: "post added",
  // });
});

app.get("/posts", (req, res, next) => {
  // Post.find((err, result) => {})
  Post.find().then(docs => {
    console.log(docs)
    res.status(200).json({
      message: "post",
      posts: docs,
    });
  }).catch()


  // const posts = [
  //   {
  //     id: 1,
  //     title: "hi",
  //     content: "me",
  //   },
  // ];
  // res.status(200).json({
  //   message: "post",
  //   posts: posts,
  // });
});

app.delete("/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json('deleted')
  })
})

app.put("/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json('updated')
    const updatedPost = [...this.posts]
    const oldPostIndex = updatedPost.findIndex(p => p._id === post._id)
    updatedPost[oldPostIndex] = post
    this.posts = updatedPost
    this.updatedPost.next([...this.posts])
  })
})

app.get("/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(p => {
    if(p) {
      res.status(200).json(p)
    } else {
      res.status(404).json("post not found")
    }
  })
})

module.exports = app;
