import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
