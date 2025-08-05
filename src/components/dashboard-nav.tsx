"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  User,
  LayoutDashboard,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">Amulya Nidhi</span>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith("/admin")}
            tooltip="Admin Dashboard"
          >
            <Link href="/admin">
              <LayoutDashboard />
              Admin
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith("/member")}
            tooltip="Member Dashboard"
          >
            <Link href="/member">
              <User />
              Member
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/">
              <LogOut />
              Logout
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </>
  );
}
