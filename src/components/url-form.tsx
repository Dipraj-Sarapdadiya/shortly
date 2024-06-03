'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { shortUrl } from '@/service/url-service';
import { UrlTable } from './url-table';

import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';

const formSchema = z.object({
  userUrl: z.string().min(2, 'URL is too short').max(5000).startsWith('https://', 'URL not valid'),
});

export function UrlForm({ formToggle }: { formToggle: boolean }) {
  const [shortId, setShortId] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userUrl: '',
    },
  });

  async function onSubmit(url: z.infer<typeof formSchema>) {
    const nanoId = await shortUrl(url.userUrl);
    console.log('form values: ', url, nanoId);
    setShortId(nanoId);
    form.clearErrors();
    form.reset();
    setRefreshKey((prevKey) => prevKey + 1);
  }

  return (
    <>
      {!shortId && (
        <div className="flex">
          <Form {...form}>
            <form
              className="flex flex-col lg:flex-row gap-2 lg:gap-2 w-full justify-center items-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="userUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Add URL to short" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="lg:flex-1 w-full" variant="default" type="submit">
                Short it
              </Button>
            </form>
          </Form>
        </div>
      )}
      {shortId && (
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-2 w-full justify-center items-center">
          <Input className="w-full" placeholder={`${window.location.host}/${shortId}`} readOnly={true} />
          <Button
            className="lg:flex-1 w-full"
            variant="default"
            onClick={async () => {
              await navigator.clipboard.writeText(`${window.location.host}/${shortId}`);
              toast({
                title: 'URL copied to clipboard',
              });
            }}
          >
            copy
          </Button>
        </div>
      )}
      {formToggle && (
        <div className="mt-8">
          <UrlTable refreshKey={refreshKey} />
        </div>
      )}
    </>
  );
}
