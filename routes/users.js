const express = require("express");
const userRoutes = express.Router();
const multer = require("multer");
const storage = require("../config/cloudinary");
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

// instance of multer
const upload = multer({ storage: storage });

// render forms

userRoutes.get("/register");

//register
userRoutes.post("/register", registerUserController);

// POST/api/v1/users/login
userRoutes.post("/login", loginUserController);

// GET/api/v1/users/profile
userRoutes.get("/profile", loggedIn, profileUserController);

// PUT/api/v1/users/profile-photo/:id
userRoutes.put(
  "/profile-photo/",
  loggedIn,
  upload.single("profile"),
  (req, res) => {
    console.log(req.file); // This should log the file object if successful
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    // Continue with the rest of the controller logic
    photoUserController(req, res);
  }
);
// PUT/api/v1/users/update/:id
userRoutes.put("/update/:id", updateUserController);
// PUT/api/v1/users/cover-photo/:id
userRoutes.put(
  "/cover-photo/",
  loggedIn,
  upload.single("profile"),
  coverUserController
);

// PUT/api/v1/users/update-password/:id
userRoutes.put("/update-password/:id", updatePassUserController);

//PUT/api/v1/users/logout/:id
userRoutes.put("/logout/:id", logoutUserController);

// GET/api/v1/users/:id
userRoutes.get("/:id", detailsUserController);

module.exports = userRoutes;
