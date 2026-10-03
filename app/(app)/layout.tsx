"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { AppShell } from "@/components/layout/AppShell";
import { Compass } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Preserve intended destination path for post-login redirect
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Loading state while checking authentication session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center font-poppins">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] animate-pulse shadow-lg">
            <Compass className="w-6 h-6 animate-spin" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-sm font-bold text-white tracking-wider block font-poppins">
              STARTUP IGNITER
            </span>
            <span className="text-xs text-[#FF6B00] font-mono block">
              Authenticating session...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Prevent flashing content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
