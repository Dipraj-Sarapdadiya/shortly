"use client";

import React from "react";

import PageContainer from "@/components/layout/page-container";
import { useParams } from "next/navigation";
import { UpdateLinkForm } from "@/components/updateLinkForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UpdateLink = () => {
  const { shortId } = useParams();
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Update link</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateLinkForm shortId={shortId as string} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UpdateLink;
