import { NavItem } from "@/types";

export type Activities = {
  id: number;
  title: string;
  shortKey: string;
  engagements: number;
  status: string;
};
export const activities: Activities[] = [
  {
    id: 1,
    title: "Candice Schiner",
    shortKey: "Dell",
    engagements: 50,
    status: "Active",
  },
  {
    id: 2,
    title: "John Doe",
    shortKey: "TechCorp",
    engagements: 20,
    status: "Active",
  },
  {
    id: 3,
    title: "Alice Johnson",
    shortKey: "WebTech",
    engagements: 80,
    status: "Active",
  },
  {
    id: 4,
    title: "David Smith",
    shortKey: "Innovate Inc.",
    engagements: 8,
    status: "Inactive",
  },
  {
    id: 5,
    title: "Emma Wilson",
    shortKey: "TechGuru",
    engagements: 5,
    status: "Active",
  },
  {
    id: 6,
    title: "James Brown",
    shortKey: "CodeGenius",
    engagements: 10,
    status: "Active",
  },
  {
    id: 7,
    title: "Laura White",
    shortKey: "SoftWorks",
    engagements: 16,
    status: "Active",
  },
  {
    id: 8,
    title: "Michael Lee",
    shortKey: "DevCraft",
    engagements: 42,
    status: "Active",
  },
  {
    id: 9,
    title: "Olivia Green",
    shortKey: "WebSolutions",
    engagements: 23,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
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
