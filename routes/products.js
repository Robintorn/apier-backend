const mongodb = require('mongoose');
const Product = require('../models/product');
const express = require('express');
const route = express.Router();

route.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then((products) => {
        console.log(products);
        res.status(200).json(products);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
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
    
        console.log(doc);
        res.status(200).json(doc);
    });
})

route.delete('/:_id', (req, res, next) => {
    Product.findByIdAndRemove({_id: "5b8ecc36b672c52534dfc2df"}, (err, response) => {
       if(err) {
           console.log('Couldnt remove product');
       }
       console.log(response);
       res.status(200).json(response);
    })
})

module.exports = route;