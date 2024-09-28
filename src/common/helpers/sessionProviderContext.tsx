import { SessionProvider } from "next-auth/react"
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

export default function SessionProviderContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}