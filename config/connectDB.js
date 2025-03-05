const { config } = require('dotenv');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection failed', error.message);
  }
};

connectDB();
