const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

// exports makes this file visible by requiring the file
exports.Product = mongoose.model('Product', productSchema); // when exporting this way it should be imported as an object

// module.exports = productSchema;
