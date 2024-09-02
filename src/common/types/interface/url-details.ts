import { ObjectId } from "mongoose";
import { UserDetails } from './user-details';

export interface URL {
  shortId: string;
  originalUrl: string;
  clicks: number;
}

export interface CustomLinkData {
  customShortKey?: string;
  targetUrl: string;
  title?: string;
}

export interface UrlDetails {
  _id: ObjectId;
  shortId: string;
  targetUrl: string;
  title: string;
  clicks: number;
  createdOn: Date;
  createdBy: UserDetails;
}
