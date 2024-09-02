"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CustomLinkForm } from "@/components/customLinkForm";
import { Loader2 } from "lucide-react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Links", link: "/dashboard/links" },
];

export default function Links() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    // Handle loading state
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/sign-in");
  }

  const user = session?.user;
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Craft new link</CardTitle>
          </CardHeader>
          <CardContent>
            {(user && user.id) && <CustomLinkForm userId={user.id} />}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
