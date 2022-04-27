// general settings
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// patterns for validation
const pattern1 = /^(\d{3}-){2}\d{4}$/;
const pattern2 = /^[A-Z]\d[A-Z] [A-Z]\d[A-Z]$/;

// variables
let name;
let email;
let phone;
let address;
let postCode;
let product1;
let product2;
let product3;
let shippingCharge;
let subTotal;
let provinceTax;
let total;
let errorMessages = [];
let hasAppStarted = false;

// render index page to begin with
// and if there is no error render invoice page
app.get("/", function(req, res) {
    if (errorMessages == "" && hasAppStarted) {
        res.render("invoice", {
            invoiceName: name,
            invoiceEmail: email,
            invoicePhone: phone,
            invoiceAddress: address,
            invoiceProduct1: product1,
            invoiceProduct2: product2,
            invoiceProduct3: product3,
            invoiceShippingCharge: shippingCharge,
            invoiceSubTotal: subTotal,
            invoiceTaxes: provinceTax,
            invoiceTotal: total,
        })
    }
    else {
        res.render('index', { messages: errorMessages});
    }
});

// handle request from the user
// check if required fields are empty
// check if the inputs are in the right format
app.post("/", (req, res) => {
    errorMessages = [];
    product1 = Number(req.body.carrot);
    product2 = Number(req.body.cheese);
    product3 = Number(req.body.egg);
    
    phone = req.body.phone;
    postCode = req.body.postCode;

    name = req.body.name;
    email = req.body.email;
    address = req.body.address + ", " + req.body.city
    + ", " + req.body.postCode;
    
    // required fields validation
    isEmpty(req.body.name, 'name');
    isEmpty(req.body.email, 'email');
    isEmpty(phone, 'phone');
    isEmpty(req.body.address, 'address');
    isEmpty(req.body.city, 'city');
    isEmpty(req.body.postCode, 'post code');

    // product validation
    // if at least one perchased and if it is a number
    if(req.body.carrot === "" && req.body.cheese === "" && req.body.egg === "") {
        errorMessages.push("No product selected")
    }
    else {
        if (req.body.carrot != "") {
            isDigit(product1, 'carrot');
        }
        if (req.body.cheese != "") {
            isDigit(product2, 'cheese');
        }
        if (req.body.egg != "") {
            isDigit(product3, 'egg');
        }
    }

    getDeliveryCharge(req.body.deliveryTime);
    getProvincialTax(req.body.province);

    // product price
    product1 = product1 * 10;
    product2 = product2 * 20;
    product3 = product3 * 30;

    // subtotal
    subTotal = (shippingCharge + product1 + product2 + product3).toFixed(2);

    // total
    total = (subTotal * ((provinceTax / 100) + 1)).toFixed(2);
    
    // redirec to the home
    res.redirect("/");
});

// server status
app.listen(8080, function() {
    console.log("localhost 8080 is running");
});

// check if the field is empty
// if it is empty add an error message
function isEmpty(field, fieldName) {
    if(field === "") {
        errorMessages.push(fieldName + ": Required");
    }
    else {
        if(fieldName === "phone" || fieldName === "post code") {
            checkPatterns(fieldName, fieldName);
            hasAppStarted = true;
        }
    }
};

// check if the input value is digit 
// if not, add an error message
function isDigit(field, fieldName) {
    if(Number.isNaN(field)) {
        errorMessages.push(fieldName + ": Must be digits");
    }
};

// check the input value is right format
// if not, add an error message
function checkPatterns(field, fieldName) {
    let pattern;
    let value;
    switch(fieldName) {
        case"phone":
            pattern = pattern1;
            value = phone;
            break;
        case"post code":
            pattern = pattern2;
            value = postCode;
            break;
    }
    if(!pattern.test(value)) {
        errorMessages.push(fieldName + ": Not valid format");
    }
};

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