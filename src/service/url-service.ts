"use server";

import { initMongo } from "@/models";
import UrlModel from "@/models/url-model";
import UserModel from "@/models/user-model";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { CustomLinkData } from "@/common/types/interface/url-details";
import mongoose, { ObjectId } from "mongoose";
import { UrlDetails } from '@/common/types/interface/url-details';

export const shortUrl = async (url: string) => {
  try {
    await initMongo();
    const nanoId = nanoid(6);
    const shortUrl = await UrlModel.create({
      shortId: nanoId,
      originalUrl: url,
      clicks: 0,
    });

    await shortUrl.save();
    revalidatePath("/", "layout");
    return nanoId;
  } catch (error) {
    console.error("Failed to short the url: ", error);
    return "Something went wrong please try again...";
  }
};

export const fetchAllUrls = async () => {
  try {
    await initMongo();
    const urls = await UrlModel.find();
    console.log("Fetched urls: ", urls);
    return JSON.parse(JSON.stringify(urls));
  } catch (error) {
    console.error("Failed to fetch all urls: ", error);
  }
};

export const deleteUrl = async (shortId: string) => {
  try {
    await initMongo();
    await UrlModel.deleteOne({
      shortId: shortId,
    });
  } catch (error) {
    console.error("Failed to delete url: ", error);
  }
};

export const getRedirectUrl = async (slug: string) => {
  try {
    await initMongo();
    const entry = await UrlModel.findOne({
      shortId: slug,
    });

    if (entry) {
      await UrlModel.updateOne(
        {
          _id: entry._id,
        },
        {
          $inc: { clicks: +1 },
        },
      );

      redirect("/");
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to get the short is from db: ", error);
    return null;
  }
};

export const addUrl = async (data: CustomLinkData, userId: string) => {
  try {
    await initMongo();
    if (!data.customShortKey) {
      data.customShortKey = nanoid(6);
    }

    const urlData = await UrlModel.create({
      shortId: data.customShortKey,
      targetUrl: data.targetUrl,
      title: data.title,
      createdBy: new mongoose.Types.ObjectId(userId),
    });

    const urlId = await urlData.save();

    const result = await UserModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(userId),
      },
      {
        $push: {
          urls: urlId._id,
        },
      },
    );
    return { status: 200, message: "success", shortKey: data.customShortKey };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        status: 409,
        message: "Failed",
        error: "This exact link already exists and cannot be duplicated. Change the short key and try again",
        shortKey: null,
      };
    } else {
      console.log("server error while storing short url: ", error);
      return {
        status: 500,
        message: "Failed",
        error: "Internal server error, kindly check logs to know more",
        shortKey: null,
      };
    }
  }
};

export const fetchLinkDetailByShortKey = async (shortKey: string, userEmail: string) => {
  try {
    await initMongo();

    const details: UrlDetails = await UrlModel.findOne({ shortId: shortKey }).populate({
      path: "createdBy",
      model: "users",
    });

    if (details.createdBy.email !== userEmail) {
      return {
        status: 403,
        message: 'Forbidden',
        urlDetails: null
      }
    }

    console.log('found url details: ', details);

    return {
      status: 200,
      message: "success",
      urlDetails: JSON.stringify(details),
    };
  } catch (error) {
    console.error("Failed to fetch url details by short key: ", error);
  }
};