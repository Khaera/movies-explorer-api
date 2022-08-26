const allowedCors = [
  'https://moviesexplorer.khaera.nomoredomains.sbs',
  'http://moviesexplorer.khaera.nomoredomains.sbs',
  'http://localhost:3000',
];

const FILM_INVALID_DATA = 'Переданы некорректные данные при создании фильма.';
const FILM_NOT_FOUND = 'Фильм с указанным id не найден.';
const FILM_FORBIDDEN_DELETE = 'Нельзя удалить чужой фильм.';

const USER_NOT_FOUND = 'Пользователь по указанному id не найден.';
const USER_FORBIDDEN_DATA = 'Нельзя изменить даннные другого пользователя.';
const USER_INVALID_DATA = 'Переданы некорректные данные при обновлении профиля.';
const USER_CONFLICT_EMAIL = 'Пользователь с таким email уже зарегистрирован.';

const NEED_AUTHORIZE = 'Необходима авторизация.';

const INVALID_EMAIL_OR_PASS = 'Неверный email или пароль.';

const INVALID_LINK = 'Невалидная ссылка';

const INVALID_EMAIL_FORMAT = 'Неправильный формат почты';

const SERVER_DEFAULT_MESSAGE = 'На сервере произошла ошибка.';

const VALIDATION_ERROR = 'ValidationError';

const PAGE_NOT_FOUND = 'Страница не существует.';

const MONGO_DUPLICATE_ERR = 11000;

const FILM_DELETE_SUCCESS = 'Фильм удалён.';

module.exports = {
  allowedCors,
  FILM_INVALID_DATA,
  FILM_NOT_FOUND,
  FILM_FORBIDDEN_DELETE,
  USER_NOT_FOUND,
  USER_FORBIDDEN_DATA,
  USER_INVALID_DATA,
  USER_CONFLICT_EMAIL,
  NEED_AUTHORIZE,
  INVALID_EMAIL_OR_PASS,
  INVALID_LINK,
  INVALID_EMAIL_FORMAT,
  SERVER_DEFAULT_MESSAGE,
  VALIDATION_ERROR,
  PAGE_NOT_FOUND,
  MONGO_DUPLICATE_ERR,
  FILM_DELETE_SUCCESS,
};
