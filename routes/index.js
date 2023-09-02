const routes = require('express').Router();
const cookieParser = require('cookie-parser');
const movieRoute = require('./movies');
const userRoute = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const {
  celebrateUserLoginSchema,
  celebrateUserRegisterSchema,
} = require('../middlewares/celebrateUser');
const {
  createNewUser,
  loginUser,
  logoutUser,
} = require('../controllers/users');
const testNodEnv = require('../middlewares/testNodEnv');

const { JWT_SECRET } = process.env;

routes.use(cookieParser(JWT_SECRET));

routes.post('/signin', celebrateUserLoginSchema, loginUser);
routes.post('/signup', celebrateUserRegisterSchema, createNewUser);
routes.use(testNodEnv);

routes.use(auth);

routes.use('/users', userRoute);
routes.use('/movies', movieRoute);

routes.post('/signout', logoutUser);

routes.use('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = routes;
