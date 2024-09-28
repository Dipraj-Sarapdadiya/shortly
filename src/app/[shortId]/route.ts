import { initMongo } from "@/models";
import UrlModel from "@/models/url-model";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";
import { geolocation } from "@vercel/functions";
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';

export const GET = async (req: Request, { params }: { params: { shortId: string } }) => {
  const slug = params.shortId;
  const { device, browser, os, ua, cpu, engine, isBot } = userAgent(req);
   const details = geolocation(req);

  await initMongo();
  const entry = await UrlModel.findOne({
    shortId: slug,
  });

  const click = {
    id: uuidv4(),
    createdOn: moment().toString(),
    device: device,
    browser: browser,
    os: os,
    ua: ua,
    apu: cpu,
    engine: engine,
    isBot: isBot,
    geoLocation: details,
  };
  

  if (entry) {
    await UrlModel.updateOne(
      {
        _id: entry._id,
      },
      {
        $push: { clicks: click },
      },
    );
    redirect(entry.targetUrl);
  } else {
    redirect("/not-found");
  }
};
