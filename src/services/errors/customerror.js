class CustomError extends Error {
  constructor({ name = 'Error', cause, message, code, status = 500 }) {
    super(message);
    this.name = name;
    this.cause = cause;
    this.code = code;
    this.status = status;
  }

  static createError({ name, cause, message, code, status }) {
    throw new CustomError({ name, cause, message, code, status });
  }
}

module.exports = CustomError;