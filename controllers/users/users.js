//register
const registerUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Registered",
    });
  } catch (error) {
    res.json(error);
  }
};

const loginUserController = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logged in",
    });
  } catch (error) {
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
