const express = require('express')
const app = express()

const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title: {type: String, required:true},
    content: {type: String, required:true},
})
const Post = mongoose.model("Post", postSchema)
const dbURL = 'mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority'
mongoose.connect(dbURL).then(() => {console.log('connected')}).catch(() => console.log('failed'))

app.use((req, res, next) => {
    res.send('hhhh')
})

module.exports = app