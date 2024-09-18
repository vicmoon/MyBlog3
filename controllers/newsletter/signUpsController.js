const SignUp = require("../../model/newsletter/Signup");
const appError = require("../../utils/appError");

const addSignUpController = async (req, res, next) => {
  console.log("Request Body:", req.body); // Log the incoming request body

  const { name, email } = req.body || {}; // Fallback to empty object if req.body is undefined

  if (!name || !email) {
    console.log("Missing Name or Email:", { name, email });
    return res.render("signup", {
      error: "⚠️ Name and Email are required ⚠️",
    });
  }

  try {
    // const signup = await SignUp.create({ name, email });
    res.redirect("/signup_success");
  } catch (error) {
    console.error("Error Details:", error);
    return next(appError(`An error occurred: ${error.message}`, 400));
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
