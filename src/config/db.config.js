import mongoose from 'mongoose';

export const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/polling_system');
    console.log('connected database');
  } catch (error) {
    console.log(error);
  }
};
