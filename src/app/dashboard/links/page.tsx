"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { Url } from "@/components/tables/user-tables/url";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { IUrlDetails } from "@/common/types/interface/url-details";
import { ISessionUserDetails } from "@/common/types/interface/user-details";
import { fetchLinkDetailByUserId } from "@/service/url-service";
import { useState, useEffect } from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Links", link: "/dashboard/links" },
];

export default function Links() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [urls, setUrls] = useState<IUrlDetails[] | []>([]);
  const [userDetails, setUserDetails] = useState<ISessionUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUserDetails(session.user as ISessionUserDetails);
    } else if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status]);

  const fetchUrls = async () => {
    if (userDetails) {
      setLoading(true);
      try {
        const res = await fetchLinkDetailByUserId(userDetails.id);
        setUrls(JSON.parse(res.urls));
      } catch (err) {
        console.log("Failed to fetch URLs.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [userDetails]);

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
        <Breadcrumbs items={breadcrumbItems} />
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{`Links (${urls.length})`}</CardTitle>
              <Button className="text-xs md:text-sm" onClick={() => router.push(`/dashboard/links/add`)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="grid">{urls && <Url data={urls} refreshUrls={fetchUrls} />}</div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
