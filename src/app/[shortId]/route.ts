import { initMongo } from '@/models';
import UrlModel from '@/models/url-model';
import { redirect } from 'next/navigation';
import { URL } from '@/common/types/interface/url-details';

export const GET = async (
  req: Request,
  { params }: { params: { shortId: string } }
) => {
  const slug = params.shortId;
  await initMongo();
  const entry = await UrlModel.findOne({
    shortId: slug,
  });
  console.log('entry: ', entry, slug, params);
  await UrlModel.updateOne(
    {
      _id: entry._id,
    },
    {
      $inc: { clicks: +1 },
    }
  );

  if (entry) {
    redirect(entry.originalUrl);
  } else {
    return new Response().ok;
  }
};
