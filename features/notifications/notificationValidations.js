const { celebrate, Joi, Segments } = require('celebrate');

const createNotificationValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ReceiverID: Joi.number().required(),
    Content: Joi.string().required()
  })
});



module.exports = {
  createNotificationValidation,
};
