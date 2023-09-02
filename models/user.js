const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');
const { strongPasswordPattern } = require('../utils/regex');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: [true, 'Поле "email" должно быть уникальным'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный Email в поле "email"',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
      validate: {
        validator: (v) => strongPasswordPattern.test(v),
        message: 'Некорректный Password в поле "password"',
      },
    },
  },
  {
    strict: 'throw',
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError();
      }

      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError();
        }

        return user;
      });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
