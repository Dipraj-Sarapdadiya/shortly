'use client';

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserClient } from "@/components/tables/user-tables/client";
import { Icons } from "@/components/icons";
import { IndianRupee, Loader2, Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { IUrlDetails } from "@/common/types/interface/url-details";
import { ISessionUserDetails } from "@/common/types/interface/user-details";
import { fetchLinkDetailByUserId } from "@/service/url-service";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [urls, setUrls] = useState<IUrlDetails[] | []>([]);
  const [userDetails, setUserDetails] = useState<ISessionUserDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUserDetails(session.user as ISessionUserDetails);
    } else if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [router, status]);

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
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
          <Button className="text-xs md:text-sm" onClick={() => router.push(`/dashboard/links/add`)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                  <Icons.link className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{urls.length}</div>
                  <p className="text-xs text-muted-foreground">{500 - urls.length} remaining with basic plan</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total QR codes</CardTitle>
                  <Icons.qrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">100 remaining with basic plan</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Engagements</CardTitle>
                  <Icons.trendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{urls.reduce((acc, curr) => acc + curr.clicks.length, 0)}</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-1 md:col-span-2 lg:col-span-7">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm md:text-lg font-medium">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserClient data={urls} refreshUrls={fetchUrls} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <IndianRupee className="h-4 w-4 text-muted-foreground"></IndianRupee>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
              <div className="col-span-4"></div>
              <div className="col-span-4 md:col-span-3"></div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
