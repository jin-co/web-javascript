// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// // this allows different servers can talk to each other
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 
//     'Origin, X-Requested-With, Content-Type, Accept')
//     res.setHeader('Access-Control-Allow-Metods',
//     'GET, POST, PATCH, DELETE, OPTIONS')
//     next();
// })

// app.post('/posts', (req, res, next) => {
//     const post = req.body;
//     console.log(post)
//     res.status(201).json()
// })

// app.use('/posts', (req, res, next) => {
//     const post = [
//         {id: '123', title: 'server', content: 'good'},
//         {id: '124', title: 'server', content: 'best'},
//         {id: '125', title: 'server', content: 'great'},
//         {id: '126', title: 'server', content: 'good'},
//         {id: '127', title: 'server', content: 'good'},
//     ]
//     res.status(200).json({
//         message: 'back',
//         post: post
//     })    
// })

// app.listen();

// module.exports = app;


const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
