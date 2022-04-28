// requiring dependencies
const express = require('express');
var path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const app = express();

// settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));
app.use(express.json());

// database connection
mongoose.connect('mongodb://localhost:27017/final', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("database connected");
});

// variables
let subTotal;
let total;

// schema model
const Field = mongoose.model('field', {
    name: String,
    phone: String,
    chicken: Number,
    fries: Number,
    soda: Number,
    subTotal: Number,
    tax: Number,
    total: Number
});

// router for homepage
app.get("/", (req, res) => {
    res.render("index", {
        errors: ""
    });
})

// router for invoice
app.get("/invoice", (req, res) => {
    res.render("invoice");
});

// router for records
app.get("/listing", (req, res) => {
    Field.find((err, foundItem) => {
        if (!err) {
            if (foundItem) {
                res.render("listing", {
                    foundRecords: foundItem
                });
            } else {
                console.log("No record exists");
            }
        } else {
            console.log(err);
        }
    })
});

// posts
app.post("/", [
    check('name', "name: required").trim().notEmpty(),
    check('phone').trim().notEmpty().withMessage("phone: required")
    .matches(/^(\d{3}-){3}\d{4}$/).withMessage("phone: invalid format"),
    check('chicken', "chicken: required").trim().notEmpty(),
    check('fries', "fries: required").trim().notEmpty(),
    check('soda', "soda:enter number").isInt(),
], (req, res) => {
    // errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('/index', {
            errors: errors.array()
        });
    } else {
        // data saving
        const field = new Field ({
            name: req.body.field1,
            email: req.body.field2,
            phone: req.body.field3,
            address: req.body.field4,
            product: req.body.field5,
            subTotal: req.body.field6,
            total: req.body.field7,
            image: imageName
        });
        field.save().then(() => console.log("New item saved"));

        // calculating
        const chicken = req.body.chicken * 5.99;
        const fires = req.body.fries * 1.99;
        const soda = req.body.soda * 5.49;
        const tax = 1.13;
        subTotal = chicken + fires + soda;
        total = subTotal * tax;

        // rendering result
        res.render("invoice", {
            invoiceName: req.body.name,
            invoicePhone: req.body.phone,
            invoiceChicken: req.body.chicken,
            invoiceFries: req.body.fries,
            invoiceSoda: req.body.soda,
            invoiceSubTotal: subTotal,
            invoiceTax: tax,
            invoiceTotal: total
        });
    }
});

// server status
app.listen(8080, () => {
    console.log("8080 server is running");
});

