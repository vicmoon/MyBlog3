const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const postRoutes = express.Router();

const {
  postPostController,
  allPostsController,
  onePostsController,
  deletePostsController,
  editPostsController,
} = require("../../controllers/posts/postsController");

const loggedIn = require("../../middlewares/loggedIn");
// instance of multer

const upload = multer({
  storage,
});
// render Post form

postRoutes.get("/add-post", (req, res) => {
  res.render("posts/addPost", {
    error: "",
  });
});

//POST/api/v1/posts/
postRoutes.post("/", loggedIn, upload.single("file"), postPostController); //checks if the user is logged in first,makes the request to save image

//GET/api/v1/posts/ (all)
postRoutes.get("/", allPostsController);

//GET/api/v1/posts/:id
postRoutes.get("/:id", onePostsController);

//DELETE/api/v1/posts/:id
postRoutes.delete("/:id", loggedIn, deletePostsController);

//PUT/api/v1/posts/:id
postRoutes.put("/:id", loggedIn, upload.single("file"), editPostsController);

module.exports = postRoutes;
