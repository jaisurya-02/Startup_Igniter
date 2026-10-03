"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Team", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Startups", href: "#" },
  { label: "Investors", href: "#" },
  { label: "Events", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Contact Us", href: "#" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBFDF9]/90 backdrop-blur-md border-b border-[#6E9322]/15 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#E4F2D0] border border-[#6E9322]/30 flex items-center justify-center text-[#6E9322] shadow-sm group-hover:bg-[#6E9322] group-hover:text-white transition-all duration-300">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v8" />
              <path d="m4.93 10.93 4.24 4.24" />
              <path d="M2 18h12" />
              <path d="M20 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
              <circle cx="12" cy="6" r="3" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-extrabold font-heading text-[#1A271C] tracking-tight block">
              Startup Igniter
            </span>
            <span className="text-[10px] font-semibold text-[#6E9322] uppercase tracking-wider block">
              Venture Operating System
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-semibold transition-colors duration-200 ${
                idx === 0
                  ? "text-[#6E9322] font-bold"
                  : "text-[#586B5B] hover:text-[#6E9322]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm">
            Start Building
          </Button>
        </div>
      </div>
    </header>
  );
}
