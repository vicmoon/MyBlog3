const express = require("express");
const app = express();
require("dotenv").config();

require("./config/connectDB");

//middlewares

//routes
// user Routes
// POST/api/v1/users/register
app.post("/api/v1/users/register", async (req, res) => {
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
app.post("/api/v1/users/login", async (req, res) => {
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
app.get("/api/v1/users/:id", async (req, res) => {
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
app.get("/api/v1/users/profile/:id", async (req, res) => {
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
app.put("/api/v1/users/profile-photo/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile image",
    });
  } catch (error) {
    res.json(error);
  }
});

// PUT/api/v1/users/cover-photo/:id
app.put("/api/v1/users/cover-photo/:id", async (req, res) => {
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
app.put("/api/v1/users/update-password/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User cover photo",
    });
  } catch (error) {
    res.json(error);
  }
});

//post Route

//comment Route

//error handle middlewares

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on: ${PORT}`));
