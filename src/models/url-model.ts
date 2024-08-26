import mongoose from "mongoose";

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
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
});

export default mongoose.models.urls || mongoose.model("urls", UrlModel);
