"use client";

import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "./columns";
import { IUrlDetails } from "@/common/types/interface/url-details";

interface UserClientProps {
  data: IUrlDetails[];
  refreshUrls: () => void;
}

export const UserClient: React.FC<UserClientProps> = ({ data, refreshUrls }) => {
  return (
    <>
      <DataTable columns={getColumns(refreshUrls)} data={data} refreshUrls={refreshUrls} />
    </>
  );
};
