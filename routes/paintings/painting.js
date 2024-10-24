const express = require('express');
const paintingRoutes = express.Router();
const multer = require('multer');
const storage = require('../../config/cloudinary');

// Instance of multer
const upload = multer({ storage: storage });

// POST/api/v1/paintings/
const {
  uploadPaintingController,
  getPaintingController,
} = require('../../controllers/paintings/paintingsController');

// Render paintings form
paintingRoutes.get('/add-painting', (req, res) => {
  // console.log('GET /add-painting route hit');
  res.render('addPainting');
});

// Handle POST request for uploading a painting
paintingRoutes.post('/', upload.single('painting'), uploadPaintingController);

// GET/api/v1/resources/ (or paintings)
paintingRoutes.get('/', getPaintingController);

module.exports = paintingRoutes;
