import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
  userName: {
    type: String,
    require: [true, "Please provide username"],
  },
  email: {
    type: String,
    require: [true, "Please provide email"],
  },
  firstName: {
    type: String,
    require: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
    require: [true, "Please provide last name"],
  },
  password: {
    type: String,
    require: [true, "Please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  urls: [
    {
      type: Schema.Types.ObjectId,
      ref: "urls",
    },
  ],
  forgotPasswordToken: String,
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordTokenExpiry: Date,
});

export default mongoose.models.users || mongoose.model("users", UserModel);
