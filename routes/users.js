const route = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const {
  celebrateUserUpdateProfileSchema,
} = require('../middlewares/celebrateUser');

route.get('/me', getCurrentUser);
route.patch('/me', celebrateUserUpdateProfileSchema, updateCurrentUser);

module.exports = route;
