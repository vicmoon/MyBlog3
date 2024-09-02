const appErr = require("../utils/appError");

const loggedIn = (req, res, next) => {
  //check if logged in
  if (req.session.userAuth) {
    next();
  } else {
    next(appErr("Not authorized, try again"));
  }
};

module.exports = loggedIn;
