const express = require('express')
const app = express()
app.use((req, res, next) => {
    res.send('app server')
})

module.exports = app