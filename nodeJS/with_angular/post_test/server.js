const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.end('ser')
})

server.listen(port)