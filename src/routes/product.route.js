const checkAuth = require('../auth/check-auth');
const route = require('express').Router();

const products = require('../controllers/product.controller.js');

route.get('/', products.getProducts);
route.post('/', checkAuth, products.createProduct);
route.put('/:_id', checkAuth, products.updateProduct);
route.delete('/:_id', checkAuth, products.deleteProducts);

module.exports = route;