import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SessionProviderContext from "@/common/helpers/sessionProviderContext";

const montSerrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montSerrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ShortnShare - Makes sharing easier",
  description: "A project by Dipraj Sarapdadiya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProviderContext>
        <body className={montSerrat.className}>
          <SpeedInsights />
          <Toaster />
          {children}
        </body>
      </SessionProviderContext>
    </html>
  );
}
