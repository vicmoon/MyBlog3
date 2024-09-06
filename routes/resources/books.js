const express = require("express");

const booksRoutes = express.Router();

const {
  addBookController,
  getBookController,
} = require("../../controllers/resources/booksController");

//POST/api/v1/resources/
booksRoutes.post("/", addBookController);

//GET/api/v1/resources/
booksRoutes.get("/", getBookController);

module.exports = booksRoutes;
