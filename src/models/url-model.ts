import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
  createdOn: { type: String },
  device: {
    vendor: { type: String, default: null },
    model: { type: String, default: null },
    type: { type: String, default: null },
  },
  browser: {
    name: { type: String, default: null },
    version: { type: String, default: null },
    major: { type: String, default: null },
  },
  os: {
    name: { type: String, default: null },
    version: { type: String, default: null },
  },
  ua: { type: String, default: null },
  apu: {
    architecture: { type: String, default: null },
  },
  engine: {
    name: { type: String, default: null },
    version: { type: String, default: null },
  },
  isBot: { type: Boolean, default: false },
  geoLocation: {
    city: { type: String, default: null },
    country: { type: String, default: null },
    flag: { type: String, default: null },
    countryRegion: { type: String, default: null },
    region: { type: String, default: null },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
});

const UrlModel = new mongoose.Schema({
  shortId: {
    type: String,
    require: true,
    unique: true,
  },
  targetUrl: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    default: "Untitled",
  },
  clicks: {
    type: [ClickSchema],
    default: [],
  },
  status: {
    type: String,
    default: "ACTIVE",
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  updatedOn: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.models.urls || mongoose.model("urls", UrlModel);
