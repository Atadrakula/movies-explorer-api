const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        // передача только по HTTPS
        secure: true,
      });

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const logoutUser = (req, res, next) => {
  try {
    res.cookie('jwt', '', {
      expires: new Date(0),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: 'Вы успешно вышли из системы' });
  } catch (err) {
    next(err);
  }
};

const createNewUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { ...props } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { ...props },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'StrictModeError') {
        // StrictModeError - Строгий режим в Mongoose поднимет ошибку типа StrictModeError, если попытаться обновить документ с данными, которые не соответствуют схеме
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else if (err.name === 'CastError') {
        next(
          new NotFoundError(
            `Пользователь с указанным ${req.user._id} не найден`,
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  loginUser,
  logoutUser,
  createNewUser,
};
