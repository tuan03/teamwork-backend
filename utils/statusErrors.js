const statusErrors = {
  NOT_FOUND: {
    message: "Not Found",
    status_code: 404,
  },
  UNAUTHORIZED: {
    message: "Unauthorized",
    status_code: 401,
  },
  FORBIDDEN: {
    message: "Forbidden",
    status_code: 403,
  },
  BAD_REQUEST: {
    message: "Bad Request",
    status_code: 400,
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal Server Error",
    status_code: 500,
  },
  DATA_CONFLICT : {
    message: "Conflict",
    status_code: 409,
  },
  REQUEST_TIMEOUT :{
    message:"Request Timeout",
    status_code: 408,
  }
  // Thêm các loại lỗi khác nếu cần thiết
};

module.exports = { statusErrors };

