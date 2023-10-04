require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  process.env.PORT = '3000';
  process.env.NODE_ENV = 'development';
  process.env.JWT_SECRET = 'dev-secret';
  process.env.DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
}

const express = require('express');

const helmet = require('helmet');
const mongoose = require('mongoose');
// const apiLimiter = require('./middlewares/apiLimiter');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, celebrateError } = require('./middlewares/errorsHandler');

const app = express();
const { PORT, DB_URL } = process.env;

app.use(cors);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

// app.use(apiLimiter);

app.use(helmet());
app.use((req, res, next) => {
  console.log(`Пришел запрос: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(celebrateError);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
