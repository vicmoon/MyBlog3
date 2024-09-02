const { stack } = require("../routes/users");

const gloabalErrHandler = (err, req, res, next) => {
  //status : failed/server error
  //message:
  //stack:

  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
};

//send response
res.status(statusCode).json({
  message,
  status,
  stack,
});

module.exports = gloabalErrHandler;
