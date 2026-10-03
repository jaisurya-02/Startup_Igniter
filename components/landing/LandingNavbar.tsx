"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";

const LANDING_NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Agents", href: "#agents" },
  { label: "About", href: "#about" },
];

export function LandingNavbar() {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 font-poppins">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] shadow-sm group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-300">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold font-poppins text-white tracking-wider block">
              STARTUP IGNITER
            </span>
            <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-widest block">
              Venture Operating System
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {LANDING_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#FF6B00] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="font-bold gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard ({user?.name?.split(" ")[0]})
              </Button>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#A1A1AA] hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="font-bold">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-[#18181B] text-[#A1A1AA] hover:text-white border border-white/10"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 border-t border-white/10 mt-4 space-y-4 bg-[#121214] rounded-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#A1A1AA] hover:text-[#FF6B00] px-3 py-2 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full font-bold">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-center text-[#A1A1AA] py-2 hover:text-white"
                >
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full font-bold">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
