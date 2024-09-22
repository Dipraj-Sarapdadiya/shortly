"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { deleteUrl, fetchAllUrls } from "@/service/url-service";
import { IURL } from "@/common/types/interface/url-details";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";

export function UrlTable({ refreshKey }: { refreshKey: number }) {
  const [urls, setUrls] = useState<IURL[]>();
  const [deleting, setDeleting] = useState<boolean>();

  const deleteHandler = (shortId: string) => {
    setDeleting(true);
    deleteUrl(shortId);
    setDeleting(false);
  };

  useEffect(() => {
    const allUrls = async () => {
      const fetchedUrls = await fetchAllUrls();

      if (fetchedUrls) {
        setUrls(fetchedUrls);
      }
    };
    allUrls();
  }, [refreshKey, deleting]);

  return (
    <>
      {deleting ? (
        <h1>Deleting...</h1>
      ) : (
        <Table>
          <TableCaption className="font-semibold">
            {urls && urls.length > 0 ? "A list of your urls." : "No urls to show"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Original Url</TableHead>
              <TableHead>Short Url</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Copy</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls &&
              urls.map((url) => (
                <TableRow key={url.shortId}>
                  <TableCell className="font-medium">{url.originalUrl}</TableCell>
                  <TableCell>
                    <Link href={url.shortId}>{url.shortId}</Link>
                  </TableCell>
                  <TableCell>{url.clicks.length}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={async () => {
                              await navigator.clipboard.writeText(`${window.location.host}/${url.shortId}`);
                              toast({
                                title: "URL copied to clipboard",
                              });
                            }}
                            className="text-gray-700 bg-transparent hover:bg-slate-50">
                            <Copy />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to copy</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteHandler(url.shortId)}
                      className="text-gray-700 bg-transparent hover:bg-slate-50">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
