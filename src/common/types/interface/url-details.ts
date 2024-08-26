export interface URL {
  shortId: string;
  originalUrl: string;
  clicks: number;
}

export interface CustomLinkData {
  customShortKey?: string;
  targetUrl: string;
  title?: string;
  createdBy?: string;
}