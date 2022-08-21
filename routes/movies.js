const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const createMovieValidation = require('../utils/validation/createMovieValidation');
const deleteMovieValidation = require('../utils/validation/deleteMovieValidation');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:filmId', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
