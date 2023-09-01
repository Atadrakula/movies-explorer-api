const { Joi, Segments, celebrate } = require('celebrate');
const { strongPasswordPattern } = require('../utils/regex');

const withCelebrate = (schema) => celebrate(schema);

const celebrateUserLoginSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(strongPasswordPattern).required(),
  }),
});

const celebrateUserRegisterSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(strongPasswordPattern).required(),
  }),
});

const celebrateUserUpdateProfileSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().pattern(strongPasswordPattern),
  }),
});

module.exports = {
  celebrateUserRegisterSchema,
  celebrateUserLoginSchema,
  celebrateUserUpdateProfileSchema,
};
