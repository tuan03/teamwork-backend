const { celebrate, Joi, Segments } = require('celebrate');

exports.createUserValidation = celebrate({
  [Segments.BODY]: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
  },
});
