'use server';

import { toast } from '@/components/ui/use-toast';
import { initMongo } from '@/models';
import UrlModel from '@/models/url-model';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export const shortUrl = async (url: string) => {
  try {
    await initMongo();
    const shortUrl = await UrlModel.create({
      shortId: nanoid(6),
      originalUrl: url,
      clicks: 0,
    });

    await shortUrl.save();
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Failed to short the url: ', error);
  }
};

export const fetchAllUrls = async () => {
  try {
    await initMongo();
    const urls = await UrlModel.find();
    console.log('Fetched urls: ', urls);
    return JSON.parse(JSON.stringify(urls));
  } catch (error) {
    console.error('Failed to fetch all urls: ', error);
  }
};

export const deleteUrl = async (shortId: string) => {
  try {
    await initMongo();
    await UrlModel.deleteOne({
      shortId: shortId,
    });
  } catch (error) {
    console.error('Failed to delete url: ', error);
  }
};
