const Movie = require('../models/movie');
const {
  FILM_INVALID_DATA,
  FILM_NOT_FOUND,
  FILM_FORBIDDEN_DELETE,
  VALIDATION_ERROR,
  FILM_DELETE_SUCCESS,
} = require('../utils/constants');

const BadRequestError = require('../utils/errors/bad-request-err');
const ForbiddenError = require('../utils/errors/forbidden-err');
const NotFoundError = require('../utils/errors/not-found-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    },
  )
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(FILM_INVALID_DATA));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { filmId } = req.params;

  Movie
    .findById(filmId)
    .orFail(new NotFoundError(FILM_NOT_FOUND))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError(FILM_FORBIDDEN_DELETE));
      }
      return movie.remove()
        .then(() => res.send({ message: FILM_DELETE_SUCCESS }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
