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
  console.log(req.body);
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
  // any user will have access
  // console.log(req.params);
  // get user id form params (from the controller)
  const userID = req.params.id;
  //find the user
  const user = await User.findById(userID);
  try {
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

const profileUserController = async (req, res) => {
  //get the login User
  const userID = req.session.userAuth;
  //find the user
  const user = await User.findById(userID)
    .populate("posts")
    .populate("comments");
  try {
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};

const photoUserController = async (req, res) => {
  // console.log(req.file);
  try {
    // find the user to be updated
    const userID = req.session.userAuth;
    const userFound = await User.findById(userID);
    if (!userFound) {
      return next(appErr("No such user was found", 403));
    }
    //update the found user
    await User.findByIdAndUpdate(
      userID,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Success",
      data: "You have updated the profile photo",
    });
  } catch (error) {
    // res.json(error);
    return next(appErr(error.message));
  }
};

const updateUserController = async (req, res, next) => {
  const { fullname, email } = req.body;

  //check if the email is taken

  if (email) {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return next(appErr("The email is already in use", 400));
    }
  }
  // if email is NOT taken, update the user

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      fullname,
      email,
    },
    {
      new: true,
    }
  );

  try {
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const coverUserController = async (req, res) => {
  try {
    // find the user to be updated
    const userID = req.session.userAuth;
    const userFound = await User.findById(userID);
    if (!userFound) {
      return next(appErr("No such user was found", 403));
    }
    //update the found user
    await User.findByIdAndUpdate(
      userID,
      {
        coverImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Success",
      data: "You have updated the cover photo",
    });
  } catch (error) {
    // res.json(error);
    return next(appErr(error.message));
  }
};

const updatePassUserController = async (req, res, next) => {
  const { password } = req.body;

  try {
    if (!password) {
      return next(appErr("Password is required"));
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    // Update the user's password
    await User.findByIdAndUpdate(
      req.params.id,
      { password: passwordHashed },
      { new: true }
    );

    res.json({
      status: "Success",
      message: "The password has been changed",
    });
  } catch (error) {
    // Pass the error to the next middleware with a relevant message
    return next(appErr(`Error updating password: ${error.message}`));
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
