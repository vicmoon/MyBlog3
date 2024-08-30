const express = require("express");

const commentRoutes = express.Router();

//PUT/api/v1/comments/
commentRoutes.put("/", async (req, res) => {
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
commentRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment listed",
    });
  } catch (error) {
    res.json(error);
  }
});

//DELETE/api/v1/comments/:id
commentRoutes.delete("//:id", async (req, res) => {
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
commentRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment edited",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = commentRoutes;
