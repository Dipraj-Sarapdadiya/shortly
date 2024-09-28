"use client";
import { IUrlDetails } from "@/common/types/interface/url-details";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { deleteUrl } from "@/service/url-service";
import { Copy, Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: IUrlDetails;
  refreshUrls: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, refreshUrls }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const onConfirm = async () => {
    setLoading(true);
    await deleteUrl(data.shortId);
    toast({
      description: "URL deleted successfully!",
    });
    setLoading(false);
    setOpen(false);
    refreshUrls();
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`/dashboard/links/${data.shortId}`)}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/dashboard/links/${data.shortId}/update`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.host}/${data.shortId}`);
              toast({
                description: "Copied successfully!",
              });
            }}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
