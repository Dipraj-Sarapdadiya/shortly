"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Label } from "./ui/label";
import { addUrl } from "@/service/url-service";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  targetUrl: z.string().min(6, "URL is too short").max(5000).startsWith("https://", "Invalid URL"),
  title: z.string().optional(),
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
      const forbiddenWords = ["dashboard", "login", "log-in", "signup", "sign-up", "sign-in", "register"];
      return !forbiddenWords.some((word) => value?.includes(word));
    }, "Short key cannot contain predefined words")
    .refine((value) => {
      if (value?.trim() === "") {
        return true;
      }
      return value.length >= 6;
    }, "Short key must be 6 char long"),
});

export function CustomLinkForm() {
  const [processing, setProcessing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetUrl: "",
      title: "",
      customShortKey: "",
    },
  });

  async function onSubmit(urlData: z.infer<typeof formSchema>) {
    console.log("user url details: ", urlData);
    try {
      setProcessing(true);
      const shortId = await addUrl(urlData);
      form.reset();
      form.clearErrors();
      setProcessing(false);
      window.location.href = `/dashboard/links/${shortId}`;
    } catch (error: any) {
      const errString = JSON.stringify(error.message);
      if (errString.includes("E11000")) {
        form.setError("customShortKey", {
          message: "This exact link already exists and cannot be duplicated. Change the short key and try again",
        });
      } else {
        toast({
          title: "Oops... Something went wrong",
          description: "Not able to craft url. Please try after some times",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <>
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
            </div>
            {processing ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Crafting...
              </Button>
            ) : (
              <Button className="w-1/4 my-2" variant="default" type="submit">
                Craft it
              </Button>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
