const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

const route = require('express').Router();

route.get('/me', getCurrentUser);
route.patch('/me', updateCurrentUser);


module.exports = route;