"use server";

import mongoose from "mongoose";

export const initMongo = async () => {
  try {
    console.log("Mongo URL: ", process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (error) {
    console.error("Failed to init Mongo: ", error);
  }
};
