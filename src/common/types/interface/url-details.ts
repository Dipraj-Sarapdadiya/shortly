import { ObjectId } from "mongoose";
import { IUserDetails } from "./user-details";

export interface IURL {
  shortId: string;
  originalUrl: string;
  clicks: number;
}

export interface ICustomLinkData {
  customShortKey?: string;
  targetUrl: string;
  title?: string;
}

export interface IUrlDetails {
  _id: ObjectId;
  shortId: string;
  targetUrl: string;
  title: string;
  clicks: number;
  createdOn: Date;
  createdBy: IUserDetails;
}
