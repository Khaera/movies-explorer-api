require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-err');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
