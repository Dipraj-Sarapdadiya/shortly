import mongoose from "mongoose";

const UrlModel = new mongoose.Schema({
  shortId: {
    type: String,
    require: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    require: true,
  },
  clicks: Number,
});

export default mongoose.models.urls || mongoose.model("urls", UrlModel);
