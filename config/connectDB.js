const config = require('../utils/config.json');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection failed', error.message);
  }
};

connectDB();
