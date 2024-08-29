const express = require("express");

const postRoutes = express.Router();

//POST/api/v1/posts/
postRoutes.post("/", async (req, res) => {
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
postRoutes.get("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post list",
    });
  } catch (error) {
    res.json(error);
  }
});

//GET/api/v1/posts/:id
postRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post details",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/posts/:id
postRoutes.delete("/:id", async (req, res) => {
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
postRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post edited",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = postRoutes;
