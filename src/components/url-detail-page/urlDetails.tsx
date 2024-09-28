"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { CalendarClock, Loader2, Copy, Share2 } from "lucide-react";
import { fetchLinkDetailByShortKey } from "@/service/url-service";
import { IUrlDetails } from "@/common/types/interface/url-details";
import { ISessionUserDetails } from "@/common/types/interface/user-details";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { UrlDetailsActionDropdown } from "./urlDetailsActionDropdown";
import { ShareModal } from "../modal/shareModal";
import { Icons } from "../icons";
import { Switch } from "../ui/switch";
import { STATUS } from "@/common/types/enums/urlDetails";

const UrlDetails = ({ shortKey }: { shortKey: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [urlDetails, setUrlDetails] = useState<IUrlDetails | null>(null);
  const [userDetails, setUserDetails] = useState<ISessionUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session && session?.user) {
      setUserDetails(session.user as ISessionUserDetails);
    } else if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [router, session, status]);

  useEffect(() => {
    if (userDetails) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const details = await fetchLinkDetailByShortKey(shortKey, userDetails.email);
          if (details && details.status === 200) {
            setUrlDetails(JSON.parse(details.urlDetails!));
          } else if (details && details.status === 403) {
          }
        } catch (err) {
          console.log("Failed to fetch URL details.");
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [shortKey, userDetails]);

  if (status === "loading" || loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {urlDetails && (
        <Card className="col-span-4 md:col-span-3">
          <ShareModal isOpen={open} onClose={() => setOpen(false)} shortId={urlDetails.shortId} />
          <CardHeader>
            <div className="flex justify-between items-center w-full h-full">
              <CardTitle>{urlDetails.title}</CardTitle>
              <div className="flex justify-center items-center gap-x-3">
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.host}/${urlDetails.shortId}`);
                    toast({
                      description: "Copied successfully!",
                    });
                  }}>
                  <Copy className="h-5 w-5" />
                </Button>
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpen(true)}>
                  <Share2 className="h-5 w-5" />
                </Button>
                <UrlDetailsActionDropdown data={urlDetails} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-12 gap-y-3 gap-x-2">
              <label className="sm:col-span-3 font-semibold">Short Link: </label>
              <Link
                target="_blank"
                rel="noopener, noreferrer"
                className="hover:underline sm:col-span-9 bg-slate-950-"
                href={`${window.location.host}/${urlDetails.shortId}`}>{`${window.location.host}/${urlDetails.shortId}`}</Link>
              <label className="sm:col-span-3 font-semibold">Target Link: </label>
              <Link
                target="blank"
                rel="noopener, noreferrer"
                className="hover:underline sm:col-span-9"
                href={`${urlDetails.targetUrl}`}>{`${urlDetails.targetUrl.slice(0, 20)}...`}</Link>
              <label className="sm:col-span-3 font-semibold">Active: </label>
              <Switch className="sm:col-span-9" checked={urlDetails.status === STATUS.ACTIVE} aria-readonly />
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-start gap-x-2 text-xs">
              <CalendarClock className="h-4 w-4" />
              <span>{urlDetails.createdOn}</span>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagements</CardTitle>
            <Icons.trendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urlDetails?.clicks.length}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrlDetails;
