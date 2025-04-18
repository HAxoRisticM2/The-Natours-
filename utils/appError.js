class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // operational error

    Error.captureStackTrace(this, this.constructor);
    // this will remove the constructor from the stack trace
  }
}
module.exports = AppError;
// This class is used to create custom error objects in the application.
//  It extends the built-in Error class and adds additional properties such as statusCode,
//  status, and isOperational. The constructor takes a message and a status code as parameters
//  and sets the corresponding properties. The captureStackTrace method is used to create a
//  stack trace for the error, which can be useful for debugging purposes.
