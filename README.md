# Backend сервиса movies-explorer.

## :open_file_folder: Описание
Backend написан с помощью фреймворка Express.js.    
В качестве базы данных используется mongoDB.    
Все роуты защищены авторизацией, кроме регистрации и авторизации.

## :wrench: Стек используемых технологий
:red_circle: express.JS    
:red_circle: CORS    
:red_circle: mongoose    
:red_circle: validator    
:red_circle: mongoDB    
:red_circle: nginx    
:red_circle: ESLint    
:red_circle: nodemon    
:red_circle: данные для работы с JWT и ссылка на подключение к базе данных хранятся в .env файле на сервере    
:red_circle: сервер развёрнут в облаке Яндекса - ОС ubuntu 20.4

## :hammer: Функционал проекта
### Для пользователя:
:black_small_square: регистрация и авторизация (при авторизации пользователю выдаётся JWT-токен, хранящийся в локальном хранилище).
Для регистрации роут /signup метод POST, для авторизации роут /signin метод POST    
:black_small_square: изменение данные текущего пользователя (email и/или имя) роут /users/me, метод PATCH    
:black_small_square: получение текущих данных (имя, email) текущего пользователя роут /users/me метод GET

### Для работы с фильмами:
:black_small_square: получение всех фильмов, сохранённых в базе данных роут /movies, метод GET    
:black_small_square: удаление фильма, сохранённого текущим пользователем по id роут /movies/:id, метод DELETE   
:black_small_square: сохранение фильма в базу данных роут /movies, метод POST

### Если роут не найден, выводится ошибка 404.

## :question: Инструкция по использованию проекта
:one: Открыть командную строку    
:two: Клонировать репозиторий (git clone https://github.com/Khaera/movies-explorer-api.git)    
:three: Перейти в папку проекта (cd movies-explorer-api)    
:four: Установить зависимости (npm install)    
:five: Запустить удалённый сервер (npm run start), либо npm run dev (сервер запускается в режиме разработки с обновлением при любых изменениях кода)

## :question: Как подключиться к серверу?
Введите в командную строку ssh khaera@62.84.114.115    
Публичный ip адрес сервера: 62.84.114.115

## :question: Как осуществлять запросы к api?
api.moviesexplorer.khaera.nomoredomains.sbs (как по http, так и по защищенному протоколу https)
