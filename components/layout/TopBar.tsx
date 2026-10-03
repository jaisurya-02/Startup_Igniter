"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ChevronRight, User as UserIcon, LogOut, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import { getNavItemByPath } from "@/lib/navigation";
import { useAuth } from "@/lib/auth/auth-context";

interface TopBarProps {
  onMenuClick: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  student: "Student",
  founder: "Founder",
  researcher: "Researcher",
  innovator: "Innovator",
  startup_team: "Startup Team",
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentItem = getNavItemByPath(pathname);
  const pathSegments = pathname.split("/").filter(Boolean);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.replace("/login");
  };

  return (
    <header className="h-16 bg-[#121214]/90 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-20 font-poppins">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-[#18181B] border border-white/10 text-[#A1A1AA] hover:text-white hover:border-[#FF6B00]/40 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title & Breadcrumbs */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#71717A] mb-0.5">
            <span>Platform</span>
            {pathSegments.map((segment, index) => (
              <span key={index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
                <span className="capitalize">{segment.replace(/-/g, " ")}</span>
              </span>
            ))}
          </div>

          <h1 className="text-base font-bold text-white tracking-wide font-poppins">
            {currentItem?.label || "Workspace"}
          </h1>
        </div>
      </div>

      {/* Authenticated User Menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-colors focus:outline-none"
        >
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs font-semibold text-white font-poppins truncate max-w-[140px]">
              {user?.name || "Startup Founder"}
            </span>
            <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-wider">
              {user?.role ? ROLE_LABELS[user.role] || user.role : "Venture OS"}
            </span>
          </div>

          <div className="w-9 h-9 rounded-xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] shadow-sm">
            <UserIcon className="w-4 h-4" />
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-[#71717A] hidden sm:block" />
        </button>

        {/* User Profile Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-[#121214] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <p className="text-xs font-bold text-white font-poppins truncate">
                {user?.name}
              </p>
              <p className="text-[11px] text-[#A1A1AA] truncate">
                {user?.email}
              </p>
            </div>

            <Link
              href="/settings"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <SettingsIcon className="w-4 h-4 text-[#FF6B00]" />
              Settings & Account
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
