// to use this route I have to include this in the main js

var express = require('express')
var router = express.Router()
var db = require('../models')


router.get('/', function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos)
    })
    .catch(function(err) {
        res.send(err)
    })
})

router.post('/', function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {

    })
    .catch(function(err) {
        res.send(err)
    })
})

router.get('/:todoId', function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(found) {
        res.json(found)
    })
    .catch(function(err) {
        res.send(err)
    })
})

router.put('/:todoId', function(req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo)
    })
    .catch(function(err) {
        res.send(err)
    })
})

// delete
router.delete('/:todoId', function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.json({message: 'deleted'})
    })
    .catch(function(err) {
        res.send(err)
    })
})

module.exports = router