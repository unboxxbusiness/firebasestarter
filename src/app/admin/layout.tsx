import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <DashboardNav />
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen p-4 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
