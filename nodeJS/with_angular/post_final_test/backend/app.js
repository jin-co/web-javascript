const express = require('express')
const app = express()
const postRouter = require('./routers/post')
const userRouter = require('./routers/user')

const mongoose = require('mongoose')

const dbURL = 'mongodb+srv://1234:1234@cluster0.yz15b.mongodb.net/post-app?retryWrites=true&w=majority'
mongoose.connect(dbURL).then(() => {console.log('connected')}).catch(() => console.log('failed'))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "PUT, DELETE, POST, GET, FETCH, OPTIONS")

    next()
})

app.use(express.json())

app.use("/posts", postRouter)
app.use("/user", userRouter)

module.exports = app