const checkAuth = require('../auth/check-auth');
const route = require('express').Router();
const products = require('../controllers/product.controller.js');
const upload = require('../upload/upload-image');

route.get('/', products.getProducts);
route.get('/:id', products.getProduct);
route.post('/', checkAuth, upload.single('image'), products.createProduct);
route.put('/:_id', checkAuth, products.updateProduct);
route.delete('/:_id', checkAuth, products.deleteProducts);

module.exports = route;