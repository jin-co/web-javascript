const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware what logs http calls to the console
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

// middleware -> making json(body)
app.use(express.json())
app.use(morgan('tiny'));
const productRouter = require('./routers/products')
app.use(`${api}products`, productRouter)

// app.get(`/`, (req, res) => {
//     product = {
//         id: 1,
//         name: 'tom'
//     }
//     res.send(product)
// })

// schema
// const productSchema = mongoose.Schema({
//     name: String,
//     image: String,
//     countInStock: {
//         type: Number,
//         required: true
//     }
// })
const Product = require('./models/prodect')

// model
// const Product = mongoose.model('Product', productSchema);

// app.post(`/`, (req, res) => {
//     // const newProduct = req.body;
//     // console.log(newProduct);
//     // res.send(newProduct)
//     // const product = new Product({
//     //     name: req.body.name,
//     //     image: req.body.image,
//     //     countInStock: req.body.countInStock
//     // })
//     product.save().then((createdProduct => {
//         res.status(201).json(createdProduct)
//     })).catch((err) => {
//         res.status(500).json({ // for this i can create custom object
//             error: err,
//             success: false
//         })
//     })    
// })

// app.get(`${api}products`, async (req, res) => {
//     // product = {
//     //     id: 1,
//     //     name: 'tom'
//     // }
//     // res.send(product)
//     const productList = await Product.find()
//     res.send(productList);
// })

mongoose.connect(process.env.CONNECTION)
.then(() => {
    console.log('connected')
})
.catch(() => {
    console.log('connection error')
})

app.listen(3000, () => {    
    console.log("server running", api)
})