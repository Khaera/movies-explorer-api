const errorRouter = require('express').Router();
const { PAGE_NOT_FOUND } = require('../utils/constants');
const NotFoundError = require('../utils/errors/not-found-err');

errorRouter.all('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = errorRouter;
