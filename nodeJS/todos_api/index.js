var express = require('express'), 
    app = express(), 
    port = process.env.PORT || 8080

// importing route
var todoRoutes = require('./routes/todos')

app.get('/', function(req, res) {
    res.send('hi there')
})

app.use('/api/todos', todoRoutes)

app.listen(port, () => {
    console.log('8080 is running')
})