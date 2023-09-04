const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const Movie = require('../models/movie');

const getCurrentMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .orFail()
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new NotFoundError(
            `Пользователь с некорректным или невалидным id: ${_id}`,
          ),
        );
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Фильмы с пользовательским ${_id} не найдены`));
      } else {
        next(err);
      }
    });
};

const createNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(
            `Фильм с таким названием: ${nameEN} уже существует`,
          ),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма',
          ),
        );
      } else {
        next(err);
      }
    });
};

const deleteIdMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError();
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => res.send({ message: 'Фильм успешно удален', data: movie }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(
          new NotFoundError(`Фильм с указанным movieId: ${movieId} не найден`),
        );
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `Передан некорректный movieId: ${movieId} при попытке удаления фильма`,
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentMovies,
  createNewMovie,
  deleteIdMovie,
};
