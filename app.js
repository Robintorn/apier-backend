const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('mongoose');
const app = express();

mongodb.connect('mongodb://robin:7w83LnnuP6XedADg@cluster0-shard-00-00-opstr.mongodb.net:27017,cluster0-shard-00-01-opstr.mongodb.net:27017,cluster0-shard-00-02-opstr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');

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