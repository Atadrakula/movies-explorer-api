const { Joi, Segments, celebrate } = require('celebrate');
const {
  urlPattern,
  yearPattern,
  ruFilmPattern,
  enFilmPattern,
} = require('../utils/regex');

const withCelebrate = (schema) => celebrate(schema);

const celebrateСreateNewMovieSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().pattern(yearPattern).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().pattern(urlPattern).required(),
    trailerLink: Joi.string().pattern(urlPattern).required(),
    thumbnail: Joi.string().pattern(urlPattern).required(),
    nameRU: Joi.string().pattern(ruFilmPattern).required(),
    nameEN: Joi.string().pattern(enFilmPattern).required(),
  }),
});

const celebrateMovieIdSchema = withCelebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  celebrateСreateNewMovieSchema,
  celebrateMovieIdSchema,
};
