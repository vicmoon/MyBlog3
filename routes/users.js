const express = require("express");
const userRoutes = express.Router();
const {
  registerUserController,
  loginUserController,
  detailsUserController,
  profileUserController,
  photoUserController,
  updateUserController,
  coverUserController,
  updatePassUserController,
  logoutUserController,
} = require("../controllers/users/usersController");
const loggedIn = require("../middlewares/loggedIn");

//register
userRoutes.post("/register", registerUserController);

// POST/api/v1/users/login
userRoutes.post("/login", loginUserController);

// GET/api/v1/users/profile
userRoutes.get("/profile", loggedIn, profileUserController);

// PUT/api/v1/users/profile-photo/:id
userRoutes.put("/profile-photo/:id", photoUserController);

// PUT/api/v1/users/update/:id
userRoutes.put("/update/:id", updateUserController);
// PUT/api/v1/users/cover-photo/:id
userRoutes.put("/cover-photo/:id", coverUserController);

// PUT/api/v1/users/update-password/:id
userRoutes.put("/update-password/:id", updatePassUserController);

//PUT/api/v1/users/logout/:id
userRoutes.put("/logout/:id", logoutUserController);

// GET/api/v1/users/:id
userRoutes.get("/:id", detailsUserController);

module.exports = userRoutes;
