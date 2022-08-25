const { celebrate, Joi } = require('celebrate');

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    filmId: Joi.string().hex().length(24),
  }),
});

module.exports = deleteMovieValidation;
