const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paintingImage: {
    type: String,
  },
});

const Painting = mongoose.model("Painting", paintingSchema);

module.exports = Painting;
