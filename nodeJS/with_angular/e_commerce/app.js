const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware what logs http calls to the console
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

// middleware -> making json(body)
app.use(express.json())
app.use(morgan('tiny'));

app.get(`/`, (req, res) => {
    product = {
        id: 1,
        name: 'tom'
    }
    res.send(product)
})

app.post(`/`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct)
})

app.get(`${api}products`, (req, res) => {
    product = {
        id: 1,
        name: 'tom'
    }
    res.send(product)
})

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