const checkAuth = require('../auth/check-auth');
const route = require('express').Router();

const users = require('../controllers/user.controller.js');

route.post('/signup', users.signUp);
route.post('/signin', users.signIn);
route.put('/:id', checkAuth, users.updatePwd);
route.get('/', checkAuth, users.getUsers);

module.exports = route;