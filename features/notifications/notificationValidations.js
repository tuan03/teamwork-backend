const { celebrate, Joi, Segments } = require('celebrate');

const createNotificationValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ReceiverID: Joi.number().required(),
    Content: Joi.string().required()
  })
});

const markAsReadValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
});

const deleteNotificationValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
});

module.exports = {
  createNotificationValidation,
  markAsReadValidation,
  deleteNotificationValidation
};
