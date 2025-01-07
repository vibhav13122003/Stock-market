const mongoose = require('mongoose');

const dotenv = require("dotenv");


dotenv.config({ path: "./.env" });

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);

    if (err.name === 'MongoNetworkError') {
      console.log('Make sure your MongoDB is running');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
