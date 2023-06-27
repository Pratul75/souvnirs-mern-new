class AppError extends Error {
  constructor(success, message, errorStatus, errorCode, data) {
    super(message);
    (this.errorCode = errorCode?errorCode:500),
      (this.message = message?message:"Unknown Error"),
      (this.errorStatus = errorStatus?errorStatus:true),
      (this.success = success?success:false),
      (this.data = data?data:null);
  }
}

module.exports = AppError;
