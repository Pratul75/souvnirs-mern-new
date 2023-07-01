const AppError = require("../utils/AppError");

// we need to pass four parameter to tell nodejs that it is a error middleware
const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error?.errorCode).json({
      success: error?.success,
      errorStatus: error?.errorStatus,
      message: error?.message,
      data: error?.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "something went wrong",
    });
  }
};

module.exports = errorHandler;
