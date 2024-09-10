const SignUp = require("../../model/newsletter/Signup");
const appError = require("../../utils/appError");

const addSignUpController = async (req, res, next) => {
  // Log the incoming request body
  // console.log("Request Body:", req.body);

  const { name, email } = req.body;
  if (!name || !email) {
    return res.render("signup", {
      error: "⚠️Name and Email are required ⚠️",
    });
  }
  try {
    const signup = await SignUp.create({ name, email });
    res.redirect("/signup_success");
    // res.status(201).json({
    //   data: signup,
    // });
  } catch (error) {
    console.error("Error Details:", error);
    return next(appError(`An error occurred: ${error.message}`, 400)); // Bad Request
  }
};

const getSignUpController = async (req, res) => {
  try {
    const signup = await SignUp.find();
    res.json({
      status: "Success",
      data: signup,
    });
    console.log(signup);
  } catch (error) {
    return next(appError(" The resources cannot be found", error));
  }
};

module.exports = {
  addSignUpController,
  getSignUpController,
};
