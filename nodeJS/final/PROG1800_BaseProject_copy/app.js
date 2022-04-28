// requiring dependencies
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const app = express();

// settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

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
});

// router for invoice
app.get("/invoice", (req, res) => {
    res.render("invoice");
});

// router for records
app.get("/data", (req, res) => {
    Field.find((err, foundItem) => {
        if (!err) {
            if (foundItem) {
                res.render("data", {
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
    .matches(/^(\d{3}-){2}\d{4}$/).withMessage("phone: invalid format"),
    check('chicken', "chicken: required").isInt().optional({checkFalsy: true}),
    check('fries', "fries: required").isInt().optional({checkFalsy: true}),
    check('soda', "soda:enter number").isInt().optional({checkFalsy: true})
], (req, res) => {
    // errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.render('index', {
            errors: errors.array()
        });
    } else {
        // calculating
        const chicken = Number(req.body.chicken) * 5.99;
        const fires = Number(req.body.fries) * 1.99;
        const soda = Number(req.body.soda) * 5.49;
        subTotal = (Number(chicken + fires + soda)).toFixed(2);
        const tax = (1.13 * subTotal).toFixed(2);
        total = subTotal + tax;

        // data saving
        const field = new Field ({
            name: req.body.name,
            phone: req.body.phone,
            chicken: req.body.chicken,
            fries: req.body.fires,
            soda: req.body.soda,
            subTotal: subTotal,
            tax: tax,
            total: total
        });
        field.save().then(() => console.log("New item saved"));

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