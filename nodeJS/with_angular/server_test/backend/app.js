const express = require('express')

const app = express()

app.use((req, res, next) => {
    

    next()
})

app.get('/posts',(req, res, next) => {
    const post = [
        {title: 'tom', content: 'jack'}
    ]

    res.json(post)
})


module.exports = app