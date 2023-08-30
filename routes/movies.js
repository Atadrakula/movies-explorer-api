const { getCurrentMovies, createNewMovie, deleteIdMovie } = require('../controllers/movie');

const route = require('express').Router();

route.get('/', getCurrentMovies);
route.post('/', createNewMovie);
route.delete('/:movieId', deleteIdMovie);

module.exports = route;