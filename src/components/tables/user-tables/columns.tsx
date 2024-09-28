"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IUrlDetails } from "@/common/types/interface/url-details";

export function getColumns(refreshUrls: () => void): ColumnDef<IUrlDetails>[] {
  return [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "TITLE",
    },
    {
      accessorKey: "shortId",
      header: "SHORT KEY",
    },
    {
      accessorKey: "clicks",
      header: "ENGAGEMENTS",
      cell: ({ row }) => {
        const clicksArray = row.original.clicks;
        return clicksArray ? clicksArray.length : 0;
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
    },
    {
      id: "copy",
      cell: ({ row }) => <CellAction data={row.original} refreshUrls={refreshUrls} />,
    },
  ];
}
