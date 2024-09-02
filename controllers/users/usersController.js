const bcrypt = require("bcryptjs");
const User = require("../../model/users/User");
const appErr = require("../../utils/appError");

// Register user controller
//register
const registerUserController = async (req, res, next) => {
  console.log(req.session);
  const { fullname, email, password } = req.body;
  //check if field is empty
  if (!fullname || !email || !password) {
    return next(appErr("All fields are required"));
  }
  try {
    // Check if user exists
    const userExisting = await User.findOne({ email });

    if (userExisting) {
      return next(appErr("User already exists"));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); // Await the salt generation
    const passwordHashed = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create the user
    const newUser = await User.create({
      fullname,
      email,
      password: passwordHashed,
    });
    res.json({
      status: "Success",
      data: newUser,
      user: " User registered",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
    res.json(error);
  }
};

const loginUserController = async (req, res, next) => {
  // console.log((req.session.loginUser = "Greenish"));
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appErr("Email and password are required"));
  }
  try {
    // Check if the email exists
    const userFound = await User.findOne({ email }); // Add await here
    if (!userFound) {
      return next(appErr("Invalid login credentials"));
    }

    // Verify password
    const checkPasswordValidity = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!checkPasswordValidity) {
      return next(appErr("Invalid login credentials"));
    }
    //save the user info
    req.session.userAuth = userFound._id;
    console.log(req.session);
    res.json({
      status: "Success",
      user: userFound,
      user: "User logged in",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
    res.json(error);
  }
};

const detailsUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User details",
    });
  } catch (error) {
    res.json(error);
  }
};

const profileUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile",
    });
  } catch (error) {
    res.json(error);
  }
};

const photoUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile image",
    });
  } catch (error) {
    res.json(error);
  }
};

const updateUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update",
    });
  } catch (error) {
    res.json(error);
  }
};

const coverUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User cover photo",
    });
  } catch (error) {
    res.json(error);
  }
};

const updatePassUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update password",
    });
  } catch (error) {
    res.json(error);
  }
};

const logoutUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  detailsUserController,
  profileUserController,
  photoUserController,
  updateUserController,
  coverUserController,
  updatePassUserController,
  logoutUserController,
}; // export as an object
