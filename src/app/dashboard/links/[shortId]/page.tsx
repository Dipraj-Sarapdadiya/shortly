import React from "react";

import PageContainer from "@/components/layout/page-container";
import UrlDetails from "@/components/url-detail-page/urlDetails";

const LinkDetails = ({ params }: { params: { shortId: string } }) => {
  return (
    <PageContainer scrollable={true}>
      <UrlDetails shortKey={params.shortId} />
    </PageContainer>
  );
};

export default LinkDetails;
