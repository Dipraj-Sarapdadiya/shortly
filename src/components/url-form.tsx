'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { shortUrl } from '@/service/url-service';
import { UrlTable } from './url-table';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  userUrl: z
    .string()
    .min(2, 'URL is too short')
    .max(5000)
    .startsWith('https://', 'URL not valid'),
});

export function UrlForm({ formToggle }: { formToggle: boolean }) {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userUrl: '',
    },
  });

  function onSubmit(url: z.infer<typeof formSchema>) {
    shortUrl(url.userUrl);
    console.log('form values: ', url, typeof url);
    form.clearErrors();
    form.reset();
    setRefreshKey((prevKey) => prevKey + 1);
  }

  return (
    <>
      <div className='flex'>
        <Form {...form}>
          <form
            className='flex flex-col lg:flex-row gap-2 lg:gap-2 w-full justify-center items-center'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='userUrl'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder='Add URL to short' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className='lg:flex-1 w-full' variant='default' type='submit'>
              Short it
            </Button>
          </form>
        </Form>
      </div>
      {formToggle && (
        <div className='mt-8'>
          <UrlTable refreshKey={refreshKey} />
        </div>
      )}
    </>
  );
}
