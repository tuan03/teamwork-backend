const { isCelebrateError } = require('celebrate');
const Result = require('../utils/result');
const { statusErrors } = require('../utils/statusErrors');

const handleValidationError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const details = err.details
    details.forEach(e => {
      const errorMessage = e.details[0].message;
      next(Result.error(statusErrors.BAD_REQUEST,errorMessage))
    })
  }
  next(err)
};

module.exports = handleValidationError;
// next() 
// next(err)
