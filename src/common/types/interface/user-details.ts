import { ObjectId } from 'mongoose';

export interface UserDetails {
  _id: ObjectId;
  email: string;
  password: string;
  isVerified: boolean;
  urls?: ObjectId[];
}

export interface SessionUserDetails {
  id: string;
  email: string;
}