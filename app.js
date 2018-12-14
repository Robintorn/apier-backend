const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Cors - Error Handling (eg. https://localhost:80 => https://localhost:3001 / https://84.231.14.12 => https://19.231.11.123)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
}
next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//REST API Routes
const userRoute = require('./src/routes/user.route');
const productRoute = require('./src/routes/product.route');

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

//Images
app.use('/uploads', express.static('uploads'));

module.exports = app;