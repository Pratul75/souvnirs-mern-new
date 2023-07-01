class ResponseTemp {
  constructor(success, message, errorStatus, errorCode, data) {
    (this.errorCode = errorCode),
      (this.message = message),
      (this.errorStatus = errorStatus),
      (this.success = success),
      (this.data = data);
  }
}

module.exports = ResponseTemp;
