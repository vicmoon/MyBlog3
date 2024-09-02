const { stack } = require("../routes/users");

const globalErrHandler = (err, req, res, next) => {
  // Extract information from the error object
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "Failed";
  const statusCode = err.statusCode ? err.statusCode : 500;

  // Send the response
  res.status(statusCode).json({
    message,
    status,
    stack,
  });
};

module.exports = globalErrHandler;
