import { getWelcomeEmailTemplate, getOtpVerificationTemplate } from "@/templates/emailTemplates";
import { Resend } from "resend";


const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendWelcomeEmail = async (email: string, userName: string) => {
  console.log("email where resend sends email: ", email);
  try {
    const { data, error } = await resend.emails.send({
      from: "Shortnshare <onboarding@resend.dev>",
      to: ["diprajsarapdadiya@gmail.com"],
      subject: "Welcome to Shortnshare – Start Shortening URLs and Generating QR Codes Today!",
      html: getWelcomeEmailTemplate(userName),
    });
    console.log("data return from resend: ", data);
    if (error) console.log("Error while sending welcome mail: ", error);
  } catch (error) {
    console.log("Error while sending resend mail: ", error);
  }
};

export const sendOtpForEmailVerification = async (email: string, userName: string, otp: number) => {
  console.log("email where resend sends otp: ", email, otp);
  try {
    const { data, error } = await resend.emails.send({
      from: "Shortnshare <onboarding@resend.dev>",
      to: ["diprajsarapdadiya@gmail.com"],
      subject: "Almost There! Use Your OTP to Verify Your Email",
      html: getOtpVerificationTemplate(userName, otp),
    });
    console.log("data return from resend for otp email: ", data);
    if (error) console.log("Error while sending otp mail: ", error);
  } catch (error) {
    console.log("Error while sending resend mail: ", error);
  }
};
