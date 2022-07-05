var express = require('express'), 
    app = express(), 
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser')

// importing route
var todoRoutes = require('./routes/todos')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res) {
    res.send('hi there')
})

app.use('/api/todos', todoRoutes)

app.listen(port, () => {
    console.log('8080 is running')
})