// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from 'mongoose';

export const connectUsingMongoose = async () => {
  // write your code here
  try {
    await mongoose.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected using mongoose');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};