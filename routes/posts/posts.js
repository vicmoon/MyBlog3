const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const postRoutes = express.Router();
const Post = require("../../model/posts/Post");

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

// render form to edit the post

postRoutes.get("/updatePost/:id", async (req, res) => {
  try {
    const editedPost = await Post.findById(req.params.id);
    res.render("posts/editPost", { editedPost, error: "" });
  } catch (error) {
    res.render("posts/editPost", { error, post: "" });
  }
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
