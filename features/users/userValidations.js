const { celebrate, Joi, Segments } = require('celebrate');

exports.createUserValidation = celebrate({
  [Segments.BODY]: {
    Username: Joi.string().alphanum().min(3).max(30).required(),
    PasswordHash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    Email: Joi.string().email().required(),
    FullName: Joi.string().required(),
    BirthDay: Joi.date(),
    Avatar: Joi.string(),
    Information: Joi.string(),
  },
});

exports.loginValidation = celebrate({
  [Segments.BODY]: {
    Username: Joi.string().required(),
    PasswordHash: Joi.string().required(),
    
  },
});

exports.updateUserValidation = celebrate({
  [Segments.BODY]:{
    FullName: Joi.string(),
    BirthDay: Joi.date(), 
    Email: Joi.string().email(),
    Information: Joi.string(),
  }

});

exports.forgetPasswordValidation = celebrate({
  [Segments.BODY]:{
    Email: Joi.string().email().required(),
  }
});

exports.changePasswordForgetValidation = celebrate({
  [Segments.BODY]: {
    Email: Joi.string().email().required(),
    NewPasswordHash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    ConfirmPasswordHash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().valid(Joi.ref('NewPasswordHash'))
  }
});

exports.changePasswordValidation = celebrate({
  [Segments.BODY]: {
    PasswordHash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    NewPasswordHash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    ConfirmPasswordHash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().valid(Joi.ref('NewPasswordHash'))
  }
});

