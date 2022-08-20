const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const handleErrors = require('./middlewares/handleErrors');
const auth = require('./middlewares/auth');
const movieRouter = require('./routes/movies');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт: ${PORT}`);
});
