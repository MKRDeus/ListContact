require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { userExtractor } = require('./middleware/auth');
const contactsRouter = require('./controllers/contacts');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log(error);
  }
})();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

//Rutas Frontend

app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/contacts', express.static(path.resolve('views', 'contacts')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

//Rutas Backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/contacts', userExtractor, contactsRouter);
app.use('/api/logout', logoutRouter);

module.exports = app;
