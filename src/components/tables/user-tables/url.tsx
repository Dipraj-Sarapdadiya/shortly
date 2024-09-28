"use client";

import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { getColumns } from "./columns";
import { IUrlDetails } from "@/common/types/interface/url-details";

interface ProductsClientProps {
  data: IUrlDetails[];
  refreshUrls: () => void;
}

export const Url: React.FC<ProductsClientProps> = ({ data, refreshUrls }) => {
  const router = useRouter();

  return (
    <>
      <DataTable
        refreshUrls={refreshUrls}
        pagination={true}
        searchKey={"title"}
        columns={getColumns(refreshUrls)}
        data={data}
      />
    </>
  );
};
