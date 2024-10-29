const express = require('express');
const libraryRoutes = express.Router();
const multer = require('multer');
const storage = require('../../config/cloudinary');

// Instance of multer
const upload = multer({ storage: storage });

// POST/api/v1/paintings/
const {
  uploadBookController,
  getBookController,
} = require('../../controllers/library/libraryController');

// Render paintings form
libraryRoutes.get('/add-book', (req, res) => {
  // console.log('GET /add-painting route hit');
  res.render('addBook');
});

// Handle POST request for uploading a painting
libraryRoutes.post('/', upload.single('book'), uploadBookController);

// GET/api/v1/resources/ (or paintings)
libraryRoutes.get('/', getBookController);

module.exports = libraryRoutes;
