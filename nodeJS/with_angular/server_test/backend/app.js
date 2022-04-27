const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.send('express server created')
})

module.exports = app