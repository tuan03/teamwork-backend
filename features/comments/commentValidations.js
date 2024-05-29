const { celebrate, Joi, Segments } = require('celebrate');
const User = require('../../models/userModel');

const createCommentValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    TaskID: Joi.number().required(),
    Content: Joi.string().required(),
  })
});

const updateCommentValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    Content: Joi.string().required()
  })
});

const deleteCommentValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().required()
  })
});

module.exports = {
  createCommentValidation,
  updateCommentValidation,
  deleteCommentValidation
};
