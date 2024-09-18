require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// // Log the environment variables for debugging
// console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
// console.log("CLOUDINARY_KEY:", process.env.CLOUDINARY_KEY);
// console.log("CLOUDINARY_SECRET:", process.env.CLOUDINARY_SECRET);

//configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpeg", "jpg", "png"],
  params: {
    folder: "blog-app",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
