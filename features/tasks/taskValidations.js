const { celebrate, Joi } = require('celebrate');

const createTaskValidation = celebrate({
  body: Joi.object().keys({
    ProjectID: Joi.number().integer().positive().required(),
    TaskName: Joi.string().trim().required(),
    TaskDescription: Joi.string().trim(),
    Deadline: Joi.date().iso(),
    AssigneeID: Joi.number().integer().positive(),
    Completed: Joi.boolean(),
  }),
});

const updateTaskValidation = celebrate({
  body: Joi.object().keys({
    TaskName: Joi.string().trim(),
    TaskDescription: Joi.string().trim(),
    Deadline: Joi.date().iso(),
    AssigneeID: Joi.number().integer().positive(),
    Completed: Joi.boolean(),
  }),
});

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
