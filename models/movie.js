const mongoose = require('mongoose');
const validator = require('validator');
const { yearPattern, ruPattern, enPattern } = require('../utils/regex');

const movieSchema = mongoose.Schema(
  {
    country: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "country" должно быть заполнено'],
    },
    director: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "director" должно быть заполнено'],
    },

    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },

    year: {
      type: String,
      validate: {
        validator: (v) => yearPattern.test(v),
        message: 'Некорректный формат в поле "year"',
      },
      required: [true, 'Поле "year" должно быть заполнено'],
    },

    description: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "description" должно быть заполнено'],
    },

    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL в поле "image"',
      },
      required: [true, 'Поле "description" должно быть заполнено'],
    },

    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL в поле "trailerLink"',
      },
    },

    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL в поле "thumbnail"',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле "owner" должно быть заполнено'],
    },

    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },

    nameRU: {
      type: String,
      validate: {
        validator: (v) => ruPattern.test(v),
        message: 'Некорректный символ в поле "nameRU"',
      },
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },

    nameEN: {
      type: String,
      validate: {
        validator: (v) => enPattern.test(v),
        message: 'Некорректный символ в поле "nameEN"',
      },
      required: [true, 'Поле "nameEN" должно быть заполнено'],
    },
  },
  {
    strict: 'throw',
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
