import { initMongo } from '@/models';
import UrlModel from '@/models/url-model';
import { redirect } from 'next/navigation';

export const GET = async (
  req: Request,
  { params }: { params: { shortId: string } }
) => {
  const slug = params.shortId;
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
      }
    );
    redirect(entry.originalUrl);
  } else {
    redirect('/not-found');
  }
};
