import { ObjectId } from "mongoose";
import { IUserDetails } from "./user-details";
import { STATUS } from "../enums/urlDetails";

interface IDeviceInfo {
  vendor?: string;
  model?: string;
  type?: string;
}

interface IBrowserInfo {
  name?: string;
  version?: string;
  major?: string;
}

interface IOSInfo {
  name?: string;
  version?: string;
}

interface IAPUInfo {
  architecture?: string;
}

interface IEngineInfo {
  name?: string;
  version?: string;
}

interface IGeoLocationInfo {
  city?: string;
  country?: string;
  flag?: string;
  countryRegion?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUserAgentInfo {
  _id?: ObjectId;
  createdOn: string;
  device?: IDeviceInfo;
  browser?: IBrowserInfo;
  os?: IOSInfo;
  ua?: string;
  apu?: IAPUInfo;
  engine?: IEngineInfo;
  isBot?: boolean;
  geoLocation?: IGeoLocationInfo;
}


export interface IURL {
  shortId: string;
  originalUrl: string;
  clicks: IUserAgentInfo[];
}

export interface ILinkData {
  customShortKey?: string;
  targetUrl: string;
  title?: string;
  status?: STATUS;
}

export interface IUrlDetails {
  _id: ObjectId;
  shortId: string;
  targetUrl: string;
  title: string;
  clicks: IUserAgentInfo[];
  status: string;
  createdOn: Date;
  createdBy: IUserDetails;
}
