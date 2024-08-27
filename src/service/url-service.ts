"use server";

import { initMongo } from "@/models";
import UrlModel from "@/models/url-model";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { CustomLinkData } from "@/common/types/interface/url-details";
import { AnyArray } from "mongoose";

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

export const addUrl = async (data: CustomLinkData) => {
  try {
    await initMongo();
    if (!data.customShortKey) {
      data.customShortKey = nanoid(6);
    }

    const urlData = await UrlModel.create({
      shortId: data.customShortKey,
      targetUrl: data.targetUrl,
      title: data.title,
    });


    const result = await urlData.save();
    console.log('after save result: ', result);
    revalidatePath("/", "layout");
    return data.customShortKey;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("This exact link already exists and cannot be duplicated. Change the short key and try again");
    } else {
      console.error("Server Error:", error);
      throw new Error("Unable to create short link");
    }
  }
};
