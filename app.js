const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('mongoose');
const app = express();

mongodb.connect('mongodb://localhost/inlamning1');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
})

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const productRoute = require('./src/routes/product.route');

app.use('/api/products', productRoute);

module.exports = app;