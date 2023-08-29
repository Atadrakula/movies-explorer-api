const route = require('express').Router();

route.get('/me', getCurrentUser);
route.patch('/me', updateCurrentUser);