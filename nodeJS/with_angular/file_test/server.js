const http = require('http')
const port = process.env.PROT | 3000
const app = require('./backend/app')
const server = http.createServer(app)

server.listen(port)