const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const auth = require('../middlewares/auth');

const loginValidation = require('../utils/validation/loginValidation');
const registerValidation = require('../utils/validation/registerValidation');

const errorRouter = require('./error');
const movieRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', errorRouter);

module.exports = router;
