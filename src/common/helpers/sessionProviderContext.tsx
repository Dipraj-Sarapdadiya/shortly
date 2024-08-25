import { SessionProvider } from "next-auth/react"

export default function SessionProviderContext({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}