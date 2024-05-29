const { celebrate, Joi, Segments } = require('celebrate');

const addMemberValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectID: Joi.number().required(),
    UserID: Joi.number().required(),
    Role: Joi.string().valid('Member', 'Mod', 'Admin').required()
  })
});

const removeMemberValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectID: Joi.number().required(),
    UserID: Joi.number().required()
  })
});

const updateMemberRoleValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectID: Joi.number().required(),
    UserID: Joi.number().required(),
    Role: Joi.string().valid('Member', 'Mod', 'Admin').required()
  })
});

module.exports = {
  addMemberValidation,
  removeMemberValidation,
  updateMemberRoleValidation
};
