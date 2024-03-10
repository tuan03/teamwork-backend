const Result = require('../utils/result');
const { statusErrors } = require('../utils/statusErrors');
const errorHandler = (err, req, res, next) => {
  if(err.status){
    console.log(err)
    res.status(err.status.status_code).json(err)
  } else {
    console.log(err)
    res.status(500).json(Result.error(statusErrors.INTERNAL_SERVER_ERROR,err.message));
  }     
  };
  
  module.exports = errorHandler;
  