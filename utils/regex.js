const yearPattern = /^\d{4}$/;
const ruFilmPattern = /[а-яё\s.,!'"+:?—-]+/i;
const enFilmPattern = /[a-z\s.,!'"+:?—-]+/i;

module.exports = {
  yearPattern,
  ruFilmPattern,
  enFilmPattern,
};
