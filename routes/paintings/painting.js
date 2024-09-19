const express = require("express");
const paintingRoutes = express.Router();
const multer = require("multer");
const storage = require("../../config/cloudinary");

// instance of multer
const upload = multer({ storage: storage });

//POST/api/v1/paintings/
const {
  uploadPaintingController,
  getPaintingController,
} = require("../../controllers/paintings/paintingsController");

// // render paintings form
// paintingRoutes.get("/paintings", (req, res) => {
//   res.render("paintings");
// });

paintingRoutes.post(
  "/paintings",
  upload.single("painting"),
  uploadPaintingController
);

//GET/api/v1/resources/
paintingRoutes.get("/", getPaintingController);

module.exports = paintingRoutes;
