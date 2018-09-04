const mongodb = require('mongoose');
const Product = require('../models/product.model');
const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    Product.find()
    .exec((error, product) => {
        error ? res.status(500).json({error: error}) : res.status(200).json(product)
    })
});

route.post('/', (req, res, next) => {
    let product = new Product({
        _id: new mongodb.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    })

    product.save()
    .then((result) => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch((err) => console.log(err))
})


route.put('/:_id', (req, res, next) => {
    Product.findOneAndUpdate({_id: req.body._id}, {$set:{name: req.body.name, description: req.body.description}}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        err ? res.status(500).json({error: err}) : res.status(200).json(doc)
    });
})

route.delete('/:_id', (req, res, next) => {
    Product.findByIdAndRemove({_id: req.body._id}, (err, response) => {
       err ? res.status(500).json({error: err}) : res.status(204);
    })
})

module.exports = route;