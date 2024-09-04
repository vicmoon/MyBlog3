const express = require("express");

const commentRoutes = express.Router();

const {
  addCommentsController,
  getCommentsController,
  deleteCommentsController,
  editCommentsController,
} = require("../../controllers/comments/commentsController");

const loggedIn = require("../../middlewares/loggedIn");

//POST/api/v1/comments/
commentRoutes.post("/:id", loggedIn, addCommentsController);

//GET/api/v1/comments/:id
commentRoutes.get("/:id", getCommentsController);

//DELETE/api/v1/comments/:id
commentRoutes.delete("/:id", loggedIn, deleteCommentsController);

//PUT/api/v1/comments/:id
commentRoutes.put("/:id", loggedIn, editCommentsController);

module.exports = commentRoutes;
