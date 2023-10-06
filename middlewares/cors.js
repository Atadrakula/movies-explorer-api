const allowedCors = [
  'https://web.portfolio.diploma.nomoredomainsicu.ru',
  'https://web.portfolio.nomoreparties.co',
  'https://api.nomoreparties.co',
  'http://web.portfolio.nomoreparties.co',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
  'https://127.0.0.1:27017',
  'http://127.0.0.1:27017',
];

const allowedHeaders = [
  'Content-Type',
  'Origin',
  'Accept',
  'Authorization',
  'Access-Control-Request-Method',
  'Access-Control-Request-Headers',
];

const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  // разрешаем передачу cookie
  res.header('Access-Control-Allow-Credentials', 'true');

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими методами
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
    return res.status(200).end();
  }
  return next();
};
