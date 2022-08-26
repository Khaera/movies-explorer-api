const userRouter = require('express').Router();

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

const updateUserInfoValidation = require('../utils/validation/updateUserInfoValidation');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = userRouter;
