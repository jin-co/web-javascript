//requiring modules
const express = require('express');
var path = require('path');
const app = express();
const { check, validationResult } = require('express-validator');

// settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let email;
let errorMessages = [];
let hasAppStarted = false;

// route for home page
app.get('/', (req, res) => {
    res.render('index');
});

// route for FAQ page
app.get('/faq', (req, res) => {
    res.render('faq');
});

// route for contact page
app.get('/contactform', (req, res) => {
    res.render('contactform');
});

// post request from contact form page
// check if any of the input is empty
// if not render thank you page
app.post('/contactform', [
    check('name', "Name cannot be empty").not().isEmpty(),
    check('email', "Email cannot be empty").not().isEmpty()],
    function(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('contactform', {errors: errors.array()});
        }
        else {
            res.render('thankyou', {nameOutput: req.body.name});
        }
});
// running status
app.listen(8080, () => {
    console.log("localhost 8080 is running");
});
