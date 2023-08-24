require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  process.env.PORT = '3000';
  process.env.NODE_ENV = 'development';
  process.env.JWT_SECRET = 'dev-secret';
  process.env.DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
}

const express = require('express');

const helmet = reqire('helmet');
const mongoose = require('mangoose');
const apiLimit = require('./middlewares/apiLimiter');
const routes = require('./routes');
const cors = require('./middlewares/cors');

const app = express();
const { PORT, DB_URL } = process.env;

app.use(cors);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(apiLimit);

app.use(helmet());
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Пришел запрос: ${req.method} ${req.url}`);
  next();
});
