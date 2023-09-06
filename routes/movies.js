const route = require('express').Router();
const {
  getCurrentMovies,
  createNewMovie,
  deleteIdMovie,
} = require('../controllers/movie');
const {
  celebrateСreateNewMovieSchema,
  celebrateMovieIdSchema,
} = require('../middlewares/celebrateMovie');

route.get('/', getCurrentMovies);
route.post('/', celebrateСreateNewMovieSchema, createNewMovie);
route.delete('/:movieId', celebrateMovieIdSchema, deleteIdMovie);

module.exports = route;
