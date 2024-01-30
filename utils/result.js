const { messages } = require('./statusErrors');

class Result {
  static success(sc, data = null, message = 'Success') {
    return {
      success: true,
      status:sc,
      message: message,
      data: data,
    };
  }

  static error(err, messageError = "Error") {
    return {
      success: false,
      status: err,
      message: messageError,
    };
  }
}

module.exports = Result;
