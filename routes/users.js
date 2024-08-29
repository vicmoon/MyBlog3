const express = require("express");

const userRoutes = express.Router();

//register

userRoutes.post("/register", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Registered",
    });
  } catch (error) {
    res.json(error);
  }
});

// POST/api/v1/users/login
userRoutes.post("/login", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logged in",
    });
  } catch (error) {
    res.json(error);
  }
});

// GET/api/v1/users/:id
userRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User details",
    });
  } catch (error) {
    res.json(error);
  }
});

// GET/api/v1/users/profile/:id
userRoutes.get("profile/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile",
    });
  } catch (error) {
    res.json(error);
  }
});

// PUT/api/v1/users/profile-photo/:id
userRoutes.put("/profile-photo/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile image",
    });
  } catch (error) {
    res.json(error);
  }
});

// PUT/api/v1/users/update/:id
userRoutes.put("/update/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update",
    });
  } catch (error) {
    res.json(error);
  }
});
// PUT/api/v1/users/cover-photo/:id
userRoutes.put("/cover-photo/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User cover photo",
    });
  } catch (error) {
    res.json(error);
  }
});

// PUT/api/v1/users/update-password/:id
userRoutes.put("/update-password/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update password",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/users/logout/:id
userRoutes.put("/logout/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = userRoutes;
