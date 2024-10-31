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

export interface IProfileDetails {
  email: string;
  firstName?: string,
  lastName?: string,
}