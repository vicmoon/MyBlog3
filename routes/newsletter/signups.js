const express = require("express");

const signUpsRoutes = express.Router();

const {
  addSignUpController,
} = require("../../controllers/newsletter/signUpsController");

//POST/api/v1/resources/
signUpsRoutes.post("/", addSignUpController);

module.exports = signUpsRoutes;
