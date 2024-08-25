'use server';

import UserModel from "@/models/user-model";
import { initMongo } from "@/models/index";

export const getUserDetailByEmail = async (email: string) => {
  try {
    // Initialize MongoDB connection
    await initMongo();

    // Find the user by email
    const userDetail = await UserModel.findOne({ email: email });

    if (!userDetail) return null;
    return userDetail;
  } catch (error) {
    console.error("Failed to get the user details from db: ", error);
    throw error;
  }
};
