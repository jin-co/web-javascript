// requiring dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');

// settings
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// connecting to mongoose url
mongoose.connect("mongodb://localhost:27017/assignment_4", {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("connected to database")
});

// variables
let address;
let product1;
let product2;
let product3;
let shippingCharge;
let subTotal;
let provinceTax;
let total;

// schema
const itemsSchema = {
    name: String,
    email: String,
    phone: String,
    deliveryAdress: String,
    product1: Number,
    product2: Number,
    product3: Number,
    shipping: Number,
    subTotal: Number,
    taxes: Number,
    total: Number,
}

// creating a model
const Item = mongoose.model("item", itemsSchema);

// render index page to begin with
// and if there is no error render invoice page
app.get("/", function(req, res) {
    res.render('index');
});

// getData page
// search all the data in the database
// if not found show the message on the console
// if found render the data to the getData page
app.get("/get-data", (req, res) => {
    Item.find((err, foundItem) => {
        if (!err) {
            if (foundItem) {
                res.render("getData", {
                    foundItems: foundItem,
                });
            } else {
                console.log("No item exists")
            }
        } 
    })
});

// handle request from the user
// check if required fields are empty
// check if the inputs are in the right format
// (phone number, postal code should be match pattern)
// (product must be number )
// add error message depending on the each result
// if there were no errors render invoice file
app.post("/", [
    check('name', "name: required").trim().notEmpty(),
    check('email', "email: required").trim().notEmpty(),
    check('phone').trim().notEmpty().withMessage("phone: required")
    .matches(/^(\d{3}-){2}\d{4}$/).withMessage("phone: invalid format"),
    check('address', "address: required").trim().notEmpty(),
    check('city', "city: required").trim().notEmpty(),
    check('postCode').trim().notEmpty().withMessage("postcode: required")
    .matches(/^[A-Z]\d[A-Z] [A-Z]\d[A-Z]$/).withMessage("postcode: invalid format"),
    check('carrot', "carrot: enter number").isInt().optional({checkFalsy: true}),
    check('cheese', "cheese: enter number").isInt().optional({checkFalsy: true}),
    check('egg', "egg: enter number").isInt().optional({checkFalsy: true})
],(req, res) => {
    const errors = validationResult(req);
    let noProductChosen = "";
    let productNotChosen = 0;

    if(req.body.carrot === "") {
        productNotChosen++;
    }
    if(req.body.cheese === "") {
        productNotChosen++;
    }
    if(req.body.egg === "") {
        productNotChosen++;
    }
    if(productNotChosen > 1) {
        noProductChosen = "'you have to buy at least two products'";
    }

    if(!errors.isEmpty() || noProductChosen != "") {
        res.render('index', {errors: errors.array(), noProductChosen: noProductChosen});
    } else {
        // product price
        product1 = Number(req.body.carrot) * 10;
        product2 = Number(req.body.cheese) * 20;
        product3 = Number(req.body.egg) * 30;

        address = req.body.address + ", " + req.body.city
        + ", " + req.body.postCode;
        
        getDeliveryCharge(req.body.deliveryTime);
        getProvincialTax(req.body.province);

        // subtotal
        subTotal = (shippingCharge + product1 + product2 + product3).toFixed(2);

        // total
        total = (subTotal * ((provinceTax / 100) + 1)).toFixed(2);

        // storing data
        const item = new Item ({
            name: _.lowerCase(req.body.name),
            email: req.body.email,
            phone: req.body.phone,
            deliveryAdress: address,
            product1: product1,
            product2: product2,
            product3: product3,
            shipping: shippingCharge,
            subTotal: subTotal,
            taxes: provinceTax,
            total: total
        });
        item.save().then(() => console.log("New item saved"));
        // rendering invoice file
        res.render('invoice', {
            invoiceName: req.body.name,
            invoiceEmail: req.body.email,
            invoicePhone: req.body.phone,
            invoiceAddress: address,
            invoiceProduct1: product1,
            invoiceProduct2: product2,
            invoiceProduct3: product3,
            invoiceShippingCharge: shippingCharge,
            invoiceSubTotal: subTotal,
            invoiceTaxes: provinceTax,
            invoiceTotal: total
        });
    }
});

// server status
app.listen(8080, function() {
    console.log("localhost 8080 is running");
});

// return delivery price based on the day chosen
function getDeliveryCharge(deliveryChoice) {
    switch(deliveryChoice)
    {
        case "1day":
            return shippingCharge = 30;
        case "2day":
            return shippingCharge = 25;
        case "3day":
            return shippingCharge = 20;
        case "4day":
            return shippingCharge = 15;
    }
};

// return provincial tax based on the province chosen
function getProvincialTax(province) {
    switch(province)
    {
        case "alberta":
            return provinceTax = 14;
        case "british columbia":
            return provinceTax = 13;
        case "manitoba":
            return provinceTax = 12;
        case "new brunswick":
            return provinceTax = 11;
        case "newfoundland and labrador":
            return provinceTax = 11;
        case "nova scotia":
            return provinceTax = 13;
        case "ontario":
            return provinceTax = 12;
        case "prince edward island":
            return provinceTax = 14;
        case "quebec":
            return provinceTax = 12;
        case "saskatchewan":
            return provinceTax = 16;
        case "yukon":
            return provinceTax = 11;
    }
};