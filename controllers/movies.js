const Movie = require('../models/movie');

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
    trailerLink, thumbnail, nameRU, nameEN,
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
      nameRU,
      nameEN,
    },
  )
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(owner);
        return next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie
    .findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным id не найден.'))
    .then((movie) => {
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужой фильм.'));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ message: 'Фильм удалён.' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный id фильма.'));
      }
      return next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
