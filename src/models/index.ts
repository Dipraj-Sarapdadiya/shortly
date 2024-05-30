'use server';

import mongoose from 'mongoose';

export const initMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (error) {
    console.error('Failed to init Mongo: ', error);
  }
};
