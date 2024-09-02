import { ObjectId } from "mongoose";

export interface IUserDetails {
  _id: ObjectId;
  email: string;
  password: string;
  isVerified: boolean;
  urls?: ObjectId[];
}

export interface ISessionUserDetails {
  id: string;
  email: string;
}