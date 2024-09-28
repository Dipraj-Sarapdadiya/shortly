"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Label } from "./ui/label";
import { addUrl, fetchLinkDetailByShortKey, updateUrl } from "@/service/url-service";
import { toast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import NoSsr from "@/components/NoSsr";
import { useSession } from "next-auth/react";
import { IUrlDetails } from "@/common/types/interface/url-details";
import { ISessionUserDetails } from "@/common/types/interface/user-details";
import { Switch } from "./ui/switch";
import { STATUS } from "@/common/types/enums/urlDetails";

const formSchema = z.object({
  targetUrl: z.string().min(6, "URL is too short").max(5000).startsWith("https://", "Invalid URL"),
  title: z.string().optional(),
  status: z.enum([STATUS.ACTIVE, STATUS.INACTIVE]),
  customShortKey: z
    .string()
    .refine((value) => {
      if (value?.trim() === "") {
        return true;
      }
      const regex = /^[a-zA-Z0-9-]+$/;
      if (value) {
        return regex.test(value);
      } else return false;
    }, "Invalid short key. Please use only a-z, A-Z, 0-9, and -")
    .refine((value) => {
      const forbiddenWords = ["dashboard", "login", "signup", "register"];
      return !forbiddenWords.some((word) => value?.includes(word));
    }, "Short key cannot contain predefined words")
    .refine((value) => {
      if (value?.trim() === "") {
        return true;
      }
      return value.length >= 6;
    }, "Short key must be 6 characters long"),
});

export function UpdateLinkForm({ shortId }: { shortId: string }) {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<ISessionUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetUrl: "",
      title: "",
      customShortKey: "",
      status: STATUS.ACTIVE,
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session && session?.user) {
      setUserDetails(session.user as ISessionUserDetails);
    } else if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router, session]);

  useEffect(() => {
    if (userDetails) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const details = await fetchLinkDetailByShortKey(shortId, userDetails.email);
          if (details && details.status === 200 && details.urlDetails) {
            const fetchedData = JSON.parse(details.urlDetails);

            form.reset({
              targetUrl: fetchedData.targetUrl || "",
              title: fetchedData.title || "",
              customShortKey: fetchedData.shortId || "",
              status: fetchedData.status || STATUS.ACTIVE,
            });
          }
        } catch (err) {
          console.log("Failed to fetch URL details.");
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [form, shortId, userDetails]);

  async function onSubmit(urlData: z.infer<typeof formSchema>) {
    setProcessing(true);
    console.log("updated data: ", urlData);
    const result = await updateUrl(urlData, shortId);
    if (result.status === 409) {
      form.setError("customShortKey", {
        message: result.error,
      });
      setProcessing(false);
    } else if (result.status === 500) {
      toast({
        title: "Oops... Something went wrong",
        description: "Not able to craft url. Please try after some time",
        variant: "destructive",
      });
      setProcessing(false);
    } else if (result.shortKey) {
      toast({
        title: "Success",
        description: "Url details updated successfully!",
        variant: "default",
      });
      form.clearErrors();
      router.push(`/dashboard/links/${result.shortKey}`);
      setProcessing(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex">
      <Form {...form}>
        <form className="lg:px-12 lg:w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 my-5">
            <Label className="text-lg" htmlFor="targetUrl">
              Target URL
            </Label>
            <FormField
              control={form.control}
              name="targetUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Add your target url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2 my-5">
            <Label className="text-lg" htmlFor="title">
              Title (optional)
            </Label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Add your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2 my-5">
            <Label className="text-lg" htmlFor="customShortKey">
              Custom short key (optional)
            </Label>
            <NoSsr>
              <FormField
                control={form.control}
                name="customShortKey"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex gap-x-3 justify-center items-center">
                        <Input value={window.location.host} disabled />
                        <span className="text-xl"> / </span>
                        <Input placeholder="Add your short key" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </NoSsr>
          </div>
          <div className="grid gap-2 my-5">
            <Label className="text-lg" htmlFor="status">
              Active
            </Label>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Switch
                      checked={field.value === STATUS.ACTIVE}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? STATUS.ACTIVE : STATUS.INACTIVE);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-start items-center gap-3">
            {processing ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button className="w-1/4 my-2" variant="default" type="submit">
                Update
              </Button>
            )}
            <Button className="w-1/4 my-2" variant="secondary" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
