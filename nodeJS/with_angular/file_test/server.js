const http = require('http')
const port = process.env.PROT | 3000
const server = http.createServer((req, res) => {
    res.end('h')
})

server.listen(port)