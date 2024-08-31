const express = require("express");

const postRoutes = express.Router();

const {
  postPostController,
  allPostsController,
  onePostsController,
  deletePostsController,
  editPostsController,
} = require("../../controllers/posts/postsController");

//POST/api/v1/posts/
postRoutes.post("/", postPostController);

//GET/api/v1/posts/ (all)
postRoutes.get("/", allPostsController);

//GET/api/v1/posts/:id
postRoutes.get("/:id", onePostsController);

//DELETE/api/v1/posts/:id
postRoutes.delete("/:id", deletePostsController);

//PUT/api/v1/posts/:id
postRoutes.put("/:id", editPostsController);

module.exports = postRoutes;
