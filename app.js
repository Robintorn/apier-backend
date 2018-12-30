const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('mongoose');
const app = express();


// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = 'mongodb://robin:robin123@ds145474.mlab.com:45474/food';      
//(Focus on This Variable)

// Use connect method to connect to the Server
  mongodb.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

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