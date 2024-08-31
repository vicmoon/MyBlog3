const express = require("express");

const commentRoutes = express.Router();

const {
  addCommentsController,
  getCommentsController,
  deleteCommentsController,
  editCommentsController,
} = require("../../controllers/comments/commentsController");

//PUT/api/v1/comments/
commentRoutes.put("/", addCommentsController);

//GET/api/v1/comments/:id
commentRoutes.get("/:id", getCommentsController);

//DELETE/api/v1/comments/:id
commentRoutes.delete("/:id", deleteCommentsController);

//PUT/api/v1/comments/:id
commentRoutes.put("/:id", editCommentsController);

module.exports = commentRoutes;
