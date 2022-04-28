//requiring modules
const express = require('express');
var path = require('path');
const mongoose = require('mongoose');

const app = express();
const { check, validationResult } = require('express-validator');

// connect to the database
mongoose.connect('mongodb://localhost:27017/mywebsite', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

// creat database
const Contact = mongoose.model('Contact', {
    fullName: String,
    email: String
});

// settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// route for home page
app.get('/', (req, res) => {
    Contact.find({}).exec( function(err, foundItem) {
        res.render('index', {contacts: foundItem});
    });
});

// route for FAQ page
app.get('/faq', (req, res) => {
    res.render('faq');
});

// route for contact page
app.get('/contactform', (req, res) => {
    res.render('contactform');
});

// route for delete page
app.get('/delete/:id', (req, res) => {
    let _id = req.params.id;
    Contact.findByIdAndRemove({_id: _id}).exec( function(err, itemFound) {
        res.render('delete');
    })
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
            var fullName = req.body.name;
            var email = req.body.email;
            var myNewContact = new Contact({
                fullName: fullName,
                email: email
            });

            myNewContact.save().then(() =>
            console.log("Saved a new contact")
            );

            res.render('thankyou', {nameOutput: fullName});
        }
});

// running status
app.listen(8080, () => {
    console.log("localhost 8080 is running");
});
