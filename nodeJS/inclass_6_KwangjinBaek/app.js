//requiring modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// settings
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// getting pages
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/faq', (req, res) => {
    res.render('faq');
});

// running status
app.listen(8080, () => {
    console.log("localhost 8080 is running");
});