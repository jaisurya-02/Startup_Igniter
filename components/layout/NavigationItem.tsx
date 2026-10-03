"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/navigation";

interface NavigationItemProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}

export function NavigationItem({
  item,
  isActive,
  onClick,
}: NavigationItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium font-poppins transition-all duration-200 group relative",
        isActive
          ? "bg-[#FF6B00] text-white font-semibold shadow-[0_0_15px_rgba(255,107,0,0.3)]"
          : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-colors shrink-0",
          isActive ? "text-white" : "text-[#71717A] group-hover:text-[#FF6B00]"
        )}
      />
      <span className="truncate">{item.label}</span>

      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
    </Link>
  );
}
