const { celebrate, Joi, Segments } = require('celebrate');

const createProjectValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectName: Joi.string().required(),
    ProjectDescription: Joi.string().allow(null, ''),
    Deadline: Joi.date().iso().allow(null),
    Status: Joi.string().valid('Active', 'Completed', 'Cancelled').default('Active'),
  }),
});

const updateProjectValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectID: Joi.number().required(),
    ProjectName: Joi.string(),
    ProjectDescription: Joi.string().allow(null, ''),
    Deadline: Joi.date().iso().allow(null),
    Status: Joi.string().valid('Active', 'Completed', 'Cancelled'),
  }),
});

module.exports = {
  createProjectValidation,
  updateProjectValidation,
};
