const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    _id:String,
    title:String,
    content:String
})

module.exports = mongoose.model("Post", postSchema)