"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
  role: "admin" | "member";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return; // Wait for auth state to load
    }

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.role !== role) {
      // Redirect based on role if they are in the wrong dashboard
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/member/dashboard');
      }
    }
  }, [user, loading, router, role]);

  if (loading || !user || user.role !== role) {
    // Render a loading state or null while checking auth and redirecting
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return <>{children}</>;
}
