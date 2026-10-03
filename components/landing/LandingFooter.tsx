import Link from "next/link";
import { Compass } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#050505] text-[#A1A1AA] border-t border-white/10 py-12 px-6 font-poppins">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-white font-poppins tracking-wider block">
              STARTUP IGNITER
            </span>
            <span className="text-xs text-[#71717A] block">
              &ldquo;From Idea to Execution.&rdquo;
            </span>
          </div>
        </div>

        {/* Minimal Navigation */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <a href="#platform" className="hover:text-[#FF6B00] transition-colors">
            Platform
          </a>
          <a href="#capabilities" className="hover:text-[#FF6B00] transition-colors">
            Capabilities
          </a>
          <a href="#how-it-works" className="hover:text-[#FF6B00] transition-colors">
            How It Works
          </a>
          <a href="#about" className="hover:text-[#FF6B00] transition-colors">
            About
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#71717A]">
          © {new Date().getFullYear()} Startup Igniter. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
