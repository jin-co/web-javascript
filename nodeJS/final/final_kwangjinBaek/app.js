// requiring dependencies
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const app = express();
const fileUpload = require('express-fileupload');

// settings
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());

// database connection
mongoose.connect('mongodb://localhost:27017/final', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("database connected");
});

// variables
let address;
let product1;
let shippingCharge;
let subTotal;
let provinceTax;
let total;

// schema model
const Field = mongoose.model('field', {
    name: String,
    email: String,
    phone: String,
    address: String,
    product: Number,
    subTotal: Number,
    total: Number,
    image: String
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

// router for delete
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    Field.deleteOne({_id: id}, (err, foundItem) => {
        res.render("delete");
    })
});

// app.get("/:custom", (req, res) => {
//     const route = req.params.custom;
//     res.send(route);
// });

// posts
app.post("/", [
    check('field1', "field1: required").trim().notEmpty(),
    check('field2', "field2: required").trim().notEmpty(),
    check('field3', "field2: required").trim().notEmpty(),
    check('field4', "field2: required").trim().notEmpty(),
    check('field5', "field5:enter number").isInt(),
    check('field6', "field6:enter number").isInt(),
    check('field7', "field7:enter number").isInt(),
], (req, res) => {
    // errors
    const errors = validationResult(req);

    // file upload
    const image = req.files.upload;
    const imageName = req.files.upload.name;
    image.mv('public/images/' + imageName);
    
    if (!errors.isEmpty()) {
        res.render('index', {
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

        // rendering result
        res.render("invoice", {
            invoiceField1: req.body.field1,
            invoiceField2: req.body.field2,
            invoiceField3: req.body.field3,
            invoiceField4: req.body.field4,
            invoiceField5: req.body.field5,
            invoiceField6: req.body.field6,
            invoiceField7: req.body.field7
        });
    }
});

// server status
app.listen(8080, () => {
    console.log("8080 server is running");
});