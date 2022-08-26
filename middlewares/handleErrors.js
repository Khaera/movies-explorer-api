const { SERVER_DEFAULT_MESSAGE } = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return next(res.status(500).send({ message: SERVER_DEFAULT_MESSAGE }));
};

module.exports = handleErrors;
