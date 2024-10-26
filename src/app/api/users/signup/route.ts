import { initMongo } from "@/models/index";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user-model";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/resend";

export const POST = async (req: NextRequest) => {
  try {
    await initMongo();
    const body = await req.json();
    const { firstName, lastName, password, email } = body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exist" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await newUser.save();

    const userName = `${firstName} ${lastName}`;
    await sendWelcomeEmail(email, userName);
    const response = NextResponse.json({ message: "Created user successfully!" }, { status: 201 });
    response.cookies.set("sns_user_email", email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
