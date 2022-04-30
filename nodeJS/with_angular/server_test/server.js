const http = require('http')

const server = http.createServer((req, res) => {
    res.end('server http')
})

server.listen(process.env.PORT || 3000)