import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { UserClient } from "@/components/tables/user-tables/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CustomLinkForm } from "@/components/customLinkForm";
import { activities } from "@/constants/data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Links", link: "/dashboard/links" },
];
export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Craft new link</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLinkForm />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
