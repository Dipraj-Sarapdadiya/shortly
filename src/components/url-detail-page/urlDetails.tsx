"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { fetchLinkDetailByShortKey } from "@/service/url-service";
import { UrlDetails } from "@/common/types/interface/url-details";
import { SessionUserDetails } from "@/common/types/interface/user-details";
import { Input } from "../ui/input";
import Link from "next/link";

const UrlDetails = ({ shortKey }: { shortKey: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [urlDetails, setUrlDetails] = useState<UrlDetails | null>(null);
  const [userDetails, setUserDetails] = useState<SessionUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log("setting user details: ", session.user);
      setUserDetails(session.user as SessionUserDetails);
    } else if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status]);

  useEffect(() => {
    if (userDetails) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const details = await fetchLinkDetailByShortKey(shortKey, userDetails.email);
          console.log("url details: ", details);
          if (details && details.status === 200) {
            setUrlDetails(JSON.parse(details.urlDetails!));
          } else if (details && details.status === 403) {
          }
        } catch (err) {
          setError("Failed to fetch URL details.");
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [userDetails]);

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
          <CardHeader>
            <CardTitle>{urlDetails.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-start gap-x-7">
              <label>Short Link: </label>
              <Link target="_blank" className="hover:underline"
                href={`${window.location.host}/${urlDetails.shortId}`}>{`${window.location.host}/${urlDetails.shortId}`}</Link>
            </div>
            <div className="flex items-center justify-start gap-x-5">
              <label>Target Link: </label>
              <Link target="blank" className="hover:underline"
                href={`${urlDetails.targetUrl}`}>{`${urlDetails.targetUrl}`}</Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UrlDetails;
