const http = require('http')
const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
    res.end('server up')
})

server.listen(port)
