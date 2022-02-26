const mongoose = require('mongoose');

const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock
})

// exports makes this file visible by requiring the file
exports.Product = mongoose.model('Product', productSchema);