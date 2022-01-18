var express = require('express'), app = express(), port = 8080

app.get('/', function(req, res) {
    res.send('hi there')
})

app.listen(port, () => {
    console.log('8080 is running')
})