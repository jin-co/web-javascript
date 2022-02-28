const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', (req, res) => {
    
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

module.exports = router;