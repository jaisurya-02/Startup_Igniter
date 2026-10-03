"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, X } from "lucide-react";
import { NAVIGATION_CONFIG } from "@/lib/navigation";
import { NavigationItem } from "./NavigationItem";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#121214] border-r border-white/10 w-64 shrink-0 font-poppins">
      {/* Sidebar Header / Logo */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] shadow-sm group-hover:bg-[#FF6B00] group-hover:text-white transition-all">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-white tracking-wider font-poppins block">
              STARTUP IGNITER
            </span>
            <span className="text-[9px] font-mono text-[#FF6B00] uppercase tracking-widest block">
              Venture OS
            </span>
          </div>
        </Link>

        {/* Close button for mobile drawer */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        {NAVIGATION_CONFIG.map((section) => (
          <div key={section.section} className="space-y-1.5">
            <h3 className="px-3 text-[10px] font-bold font-mono tracking-widest text-[#71717A] uppercase">
              {section.section}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavigationItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer info */}
      <div className="p-4 border-t border-white/10 bg-[#0A0A0A]/50 shrink-0">
        <div className="flex items-center justify-between text-xs text-[#71717A]">
          <span className="font-mono text-[10px] text-[#FF6B00]">PHASE 1</span>
          <span className="text-[10px]">App Shell v0.1</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={cn("hidden lg:block h-screen sticky top-0 z-30", className)}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-10 h-full max-w-xs w-full shadow-2xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
