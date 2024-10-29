const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookCover: {
    type: String,
    required: true,
  },
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
