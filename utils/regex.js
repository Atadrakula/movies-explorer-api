const yearPattern = /^\d{4}$/;
const ruFilmPattern = /[а-яё\s.,!'"+:?—-]+/i;
const enFilmPattern = /[a-z\s.,!'"+:?—-]+/i;

const urlPattern = /^https?:\/\/(?<domain>[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,3})\/(?<path>.*)$/;
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[A-Za-z\d!@#$%^&*()\-_+=]{8,}$/;

module.exports = {
  yearPattern,
  ruFilmPattern,
  enFilmPattern,
  urlPattern,
  strongPasswordPattern,
};
