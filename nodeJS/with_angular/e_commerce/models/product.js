const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String,        
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // FK
        ref: 'Category', // adding a reference
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

// exports makes this file visible by requiring the file
exports.Product = mongoose.model('Product', productSchema); // when exporting this way it should be imported as an object

// module.exports = productSchema;
