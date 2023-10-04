const mongoose = require('mongoose');
const {
  yearPattern,
  ruFilmPattern,
  enFilmPattern,
  urlPattern,
} = require('../utils/regex');

const movieSchema = mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
      unique: [true, 'Поле "movieId" должно быть уникальным'],
    },

    country: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      required: [true, 'Поле "country" должно быть заполнено'],
    },

    director: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
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
      required: [true, 'Поле "description" должно быть заполнено'],
    },

    image: {
      type: String,
      validate: {
        validator: (v) => urlPattern.test(v),
        message: 'Некорректный URL в поле "image"',
      },
      required: [true, 'Поле "description" должно быть заполнено'],
    },

    trailerLink: {
      type: String,
      validate: {
        validator: (v) => urlPattern.test(v),
        message: 'Некорректный URL в поле "trailerLink"',
      },
      required: [true, 'Поле "trailerLink" должно быть заполнено'],
    },

    thumbnail: {
      type: String,
      validate: {
        validator: (v) => urlPattern.test(v),
        message: 'Некорректный URL в поле "thumbnail"',
      },
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле "owner" должно быть заполнено'],
    },

    nameRU: {
      type: String,
      validate: {
        validator: (v) => ruFilmPattern.test(v),
        message: 'Некорректный символ в поле "nameRU"',
      },
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },

    nameEN: {
      type: String,
      validate: {
        validator: (v) => enFilmPattern.test(v),
        message: 'Некорректный символ в поле "nameEN"',
      },
      unique: [true, 'Поле "nameEN" должно быть уникальным'],
      required: [true, 'Поле "nameEN" должно быть заполнено'],
    },

    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: 'throw',
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
