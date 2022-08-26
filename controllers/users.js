require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  USER_NOT_FOUND,
  USER_FORBIDDEN_DATA,
  VALIDATION_ERROR,
  USER_INVALID_DATA,
  MONGO_DUPLICATE_ERR,
  USER_CONFLICT_EMAIL,
} = require('../utils/constants');

const BadRequestError = require('../utils/errors/bad-request-err');
const ConflictError = require('../utils/errors/conflict-err');
const ForbiddenError = require('../utils/errors/forbidden-err');
const NotFoundError = require('../utils/errors/not-found-err');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findById(userId).then((user) => {
    if (userId.toString() !== user._id.toString()) {
      throw new ForbiddenError(USER_FORBIDDEN_DATA);
    }
    return User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    )
      .then((userData) => {
        if (!userData) {
          throw new NotFoundError(USER_NOT_FOUND);
        }
        return res.send(userData);
      })
      .catch((err) => {
        if (err.name === VALIDATION_ERROR) {
          return next(new BadRequestError(USER_INVALID_DATA));
        }
        if (err.code === MONGO_DUPLICATE_ERR) {
          return next(new ConflictError(USER_CONFLICT_EMAIL));
        }
        return next(err);
      });
  });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(USER_INVALID_DATA));
      }
      if (err.code === 11000) {
        return next(new ConflictError(USER_CONFLICT_EMAIL));
      }
      return next(err);
    }));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
