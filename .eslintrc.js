module.exports = {
  // Определяем окружение, для которого будут применяться правила ESLint.
  env: {
    browser: true, // Для браузерного окружения.
    commonjs: true, // Для среды CommonJS (Node.js).
    es2021: true, // Для поддержки ECMAScript 2021.
  },
  // Используем настройки из расширения "airbnb-base".
  extends: 'airbnb-base',
  // Определяем параметры парсера JavaScript.
  parserOptions: {
    ecmaVersion: 'latest', // Используем последнюю доступную версию ECMAScript.
  },
  // Определяем правила ESLint.
  rules: {
    // Запрещаем использование нижнего подчеркивания в именах, кроме "_id".
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'max-len': ['error', { code: 300 }],
    'no-param-reassign': 'off',
  },
};
