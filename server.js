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

// PUT/api/v1/users/update/:id
app.put("/api/v1/users/update/:id", async (req, res) => {
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
      user: "User update password",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/users/logout/:id
app.put("/api/v1/users/logout/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logout",
    });
  } catch (error) {
    res.json(error);
  }
});

// POST ROUTES

//POST/api/v1/posts/
app.put("/api/v1/posts", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/posts/ (all)
app.get("/api/v1/posts", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/posts/:id
app.get("/api/v1/posts/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/posts/:id
app.delete("/api/v1/posts/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post deleted",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/posts/:id
app.put("/api/v1/posts/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post edited",
    });
  } catch (error) {
    res.json(error);
  }
});

//comment Route
app.put("/api/v1/comments", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment created",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/comments/:id
app.get("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment created",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/comments/:id
app.delete("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment deleted",
    });
  } catch (error) {
    res.json(error);
  }
});

//PUT/api/v1/comments/:id
app.put("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment edited",
    });
  } catch (error) {
    res.json(error);
  }
});

//error handle middlewares

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on: ${PORT}`));
