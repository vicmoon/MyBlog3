const bcrypt = require("bcryptjs");
const User = require("../../model/users/User");

// Register user controller
const registerUserController = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    // Check if user exists
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res.json({
        status: "failed",
        data: "User already exists",
      });
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
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email exists
    const userFound = await User.findOne({ email }); // Add await here
    if (!userFound) {
      return res.json({
        status: "Failed",
        data: "Invalid login credentials",
      });
    }

    // Verify password
    const checkPasswordValidity = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!checkPasswordValidity) {
      return res.json({
        status: "Failed",
        data: "Invalid login credentials",
      });
    }

    res.json({
      status: "Success",
      user: userFound,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
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
