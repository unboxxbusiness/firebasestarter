"use client";

import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { ProtectedRoute } from "@/components/protected-route";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute role="member">
      <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
          <DashboardNav />
        </Sidebar>
        <SidebarInset>
          <div className="min-h-screen p-4 md:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
