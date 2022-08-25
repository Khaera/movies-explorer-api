require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/bad-request-err');
const ConflictError = require('../utils/errors/conflict-err');
const NotFoundError = require('../utils/errors/not-found-err');
const UnauthorizedError = require('../utils/errors/unauthorized-err');

const { JWT_SECRET = 'dev-secret-key' } = process.env;

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь по указанному id не найден.'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findById(userId).then((user) => {
    if (userId.toString() !== user._id.toString()) {
      throw new UnauthorizedError(
        'Нельзя изменить даннные другого пользователя.',
      );
    }
    return User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    )
      .then((userData) => {
        if (!userData) {
          throw new NotFoundError('Пользователь с указанным id не найден.');
        }
        return res.send(userData);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(
            new BadRequestError(
              'Переданы некорректные данные при обновлении профиля.',
            ),
          );
        }
        if (err.code === 11000) {
          return next(
            new ConflictError('Пользователь с таким email уже зарегистрирован.'),
          );
        }
        return next(err);
      });
  });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

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
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с таким email уже зарегистрирован.'),
        );
      }
      return next(err);
    }));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
