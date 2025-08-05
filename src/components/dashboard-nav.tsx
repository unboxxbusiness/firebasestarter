"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  User,
  LayoutDashboard,
  Users,
  HandCoins,
  ArrowLeftRight,
  UserCog,
} from "lucide-react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

const adminNavItems = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/admin/loans",
    icon: HandCoins,
    label: "Loans",
  },
];

const memberNavItems = [
  {
    href: "/member/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/member/transactions",
    icon: ArrowLeftRight,
    label: "Transactions",
  },
  {
    href: "/member/profile",
    icon: UserCog,
    label: "Profile",
  },
];


export function DashboardNav() {
  const pathname = usePathname();

  const isMemberRoute = pathname.startsWith('/member');

  const navItems = isMemberRoute ? memberNavItems : adminNavItems;
  const homeRoute = isMemberRoute ? "/member" : "/admin";


  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">Amulya Nidhi</span>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                {item.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
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
