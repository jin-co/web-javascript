const http = require('http')

const server = http.createServer((req, res) => {
    res.end('haha')
})

server.listen(process.env.PORT || 3000)