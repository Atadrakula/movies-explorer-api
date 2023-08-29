const route = require('express').Router();

route.get('/', getCurrentMovies);
route.post('/', createNewMovie);
route.delete('/:movieId', deleteIdMovie);