const express = require('express');
const router = express.Router()

router.post(`/`, (req, res) => {
    // const newProduct = req.body;
    // console.log(newProduct);
    // res.send(newProduct)
    // const product = new Product({
    //     name: req.body.name,
    //     image: req.body.image,
    //     countInStock: req.body.countInStock
    // })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({ // for this i can create custom object
            error: err,
            success: false
        })
    })    
})

router.get(`/`, async (req, res) => {
    // product = {
    //     id: 1,
    //     name: 'tom'
    // }
    // res.send(product)
    const productList = await Product.find()
    res.send(productList);
})

module.exports = router;