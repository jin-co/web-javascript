const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) {
        return res.status(500).json({message: "Category search error"})
    }
    res.status(200).send(category);
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category) {
        return res.status(404).send('category can not be created');
    }
    res.send(category);
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category) {
            return res.status(200).json({
                success: true,
                message: 'category deleted'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'category deleted error'
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            error: err
        })
    })
})

router.put('/:id', async (req, res) => {
    const category = await Category.findByIDAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }
    )
    if(!category) {
        return res.status(400).json({message: "Category update error"})
    }
    res.send(category);
})

module.exports = router;