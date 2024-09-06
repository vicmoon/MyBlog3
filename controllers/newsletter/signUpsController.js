const SignUp = require("../model/newsletter/Signups.js");
const appError = require("../../utils/appError");

//POST/api/v1/newsletter/

const addSignUpController = async (req, res, next) => {
  // Log the incoming request body
  console.log("Request Body:", req.body);

  const { name, email } = req.body;

  try {
    const signup = await SignUp.create({ name, email });
    res.status(201).json({
      data: signup,
    });
  } catch (error) {
    console.error("Error Details:", error);
    return next(appError(`An error occurred: ${error.message}`, 400)); // Bad Request
  }
};

module.exports = {
  addSignUpController,
};
