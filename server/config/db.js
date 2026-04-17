const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://root:secret@localhost:27017/bidding_db?authSource=admin');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connection to DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
