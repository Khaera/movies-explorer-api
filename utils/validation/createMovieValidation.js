const { celebrate, Joi } = require('celebrate');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/^https?:\/\/(www.)?\S/i),
    trailerLink: Joi.string().pattern(/^https?:\/\/(www.)?\S/i),
    thumbnail: Joi.string().pattern(/^https?:\/\/(www.)?\S/i),
    movieId: Joi.string().hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = createMovieValidation;
