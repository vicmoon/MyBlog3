const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  link: {
    type: String, // Assuming this is an image URL or a string representation
    required: [true, "Image is required"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
