const express = require("express");
const signUpsRoutes = express.Router();
const {
  addSignUpController,
  getSignUpController,
} = require("../../controllers/newsletter/signUpsController");

// sign up form
signUpsRoutes.get("/", (req, res) => {
  res.render("signup", {
    error: "",
  });
});

// POST /api/v1/signup (this needs to be changed from /signup to match form)
signUpsRoutes.post("/", addSignUpController);

// GET /api/v1/signup
signUpsRoutes.get("/", getSignUpController);

module.exports = signUpsRoutes;
