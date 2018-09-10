const mongodb = require('mongoose');
const Product = require('../models/product.model');

exports.getProducts = (req, res) => {
    Product.find()
    .exec((error, product) => {
        error ? res.status(500).json({error: error}) : res.status(200).json(product)
    })
};

exports.createProduct = (req, res, next) => {
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
};


exports.updateProduct = (req, res, next) => {
    Product.findOneAndUpdate({_id: req.body._id}, {$set:{name: req.body.name, description: req.body.description}}, {new: true}, function(err, doc){
        err ? res.status(500).json({error: err}) : res.status(200).json(doc)
    });
};

exports.deleteProducts = (req, res, next) => {
    Product.findByIdAndRemove({_id: req.body._id}, (err, response) => {
        err ? res.status(500).json({error: err}) : res.status(204);
     })
};
