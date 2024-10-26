"use server";

import UserModel from "@/models/user-model";
import { initMongo } from "@/models/index";
import { sendOtpForEmailVerification } from "@/lib/resend";
import moment from "moment";
import { FORMAT } from "@/common/types/enums/urlDetails";

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

const setOtpInDb = async (email: string, otp: number) => {
  try {
    await initMongo();
    const res = await UserModel.updateOne(
      { email: email },
      { verifyToken: otp, verifyTokenExpiry: moment().add(1, FORMAT.HOURS).toString() },
    );
    console.log("Response after saving the otp details in db: ", res);
  } catch (error) {
    console.log("Failed to set the otp in data base: ", error);
    throw error;
  }
};

export const initOtpForEmailVerification = async (email: string, userName: string) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendOtpForEmailVerification(email, userName, otp);
    await setOtpInDb(email, otp);
    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    console.log("Failed to send otp mail or set the otp details in db: ", error);
    return {
      status: 500,
      message: "Failed",
      error: "Internal server error, kindly check logs to know more",
    };
  }
};

export const verifyEmailOtp = async (email: string, otp: number) => {
  try {
    await initMongo();
    const userDetail = await UserModel.findOne({ email: email });

    if (!userDetail) {
      return {
        status: 404,
        message: "Failed",
        error: "User or otp not found!",
      };
    }

    console.log("Fetched user details for otp verification ", userDetail);

    if (userDetail.verifyToken === otp && moment().isSameOrBefore(userDetail.verifyTokenExpiry)) {
      await UserModel.updateOne({ email: email }, { isVerified: true });
      return {
        status: 200,
        message: "Success",
      };
    } else {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
  } catch (error) {
    console.log("Failed to verify email otp: ", error);
    return {
      status: 500,
      message: "Failed",
      error: "Internal server error, kindly check logs to know more",
    };
  }
};
