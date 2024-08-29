const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongoURL");
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed", error.message);
  }
};

connectDB();
