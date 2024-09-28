import { NavItem } from "@/types";

export type Activities = {
  id: number;
  title: string;
  shortKey: string;
  engagements: number;
  status: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Links",
    href: "/dashboard/links",
    icon: "link",
    label: "link",
  },
  {
    title: "QR Codes",
    href: "/dashboard/qr-codes",
    icon: "qrCode",
    label: "qr-code",
  },
];
