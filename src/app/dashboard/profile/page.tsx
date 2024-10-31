"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { addUrl, fetchLinkDetailByShortKey, updateUrl } from "@/service/url-service";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import NoSsr from "@/components/NoSsr";
import { useSession } from "next-auth/react";
import { IUrlDetails } from "@/common/types/interface/url-details";
import { ISessionUserDetails } from "@/common/types/interface/user-details";
import { Switch } from "@/components/ui/switch";
import { STATUS } from "@/common/types/enums/urlDetails";
import PageContainer from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getUserProfileByEmail, updateUserProfile } from "@/service/user-service";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const Profile = ({ shortId }: { shortId: string }) => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<ISessionUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
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
          const response = await getUserProfileByEmail(userDetails.email);

          if (response && response.status === 200 && response.user) {
            const details = JSON.parse(response.user);
            form.reset({
              email: details.email || "",
              firstName: details.firstName || "",
              lastName: details.lastName || "",
            });
          } else if (response.status === 404) {
            toast({
              title: "Oops... Something went wrong",
              description: "Not able to get profile info. Please try after some time",
              variant: "destructive",
            });
          }
        } catch (err) {
          toast({
            title: "Oops... Something went wrong",
            description: "Please try after some time",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [form, shortId, userDetails]);

  async function onSubmit(profileDetails: z.infer<typeof formSchema>) {
    setProcessing(true);
    try {
      const res = await updateUserProfile(profileDetails);

      if (res.status === 200) {
        toast({
          description: "Profile details updated successfully!",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Oops... Something went wrong",
        description: "Please try after some time",
        variant: "destructive",
      });
    } finally {
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
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <Form {...form}>
                <form className="lg:px-12 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-2 my-5">
                    <Label className="text-lg" htmlFor="email">
                      Email
                    </Label>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input disabled {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 my-5">
                    <Label className="text-lg" htmlFor="firstName">
                      First name
                    </Label>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2 my-5">
                    <Label className="text-lg" htmlFor="lastName">
                      Last name
                    </Label>
                    <NoSsr>
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </NoSsr>
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
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Profile;
