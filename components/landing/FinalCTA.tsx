"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 px-6 relative font-poppins overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6B00]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 bg-[#121214] border border-[#FF6B00]/40 rounded-3xl p-10 sm:p-16 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B] border border-[#FF6B00]/30 text-xs text-[#FF6B00] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Your Venture Operating System</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins leading-tight">
          Your idea is only the beginning.
        </h2>

        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
          Build the evidence, strategy and execution plan required to move it forward.
        </p>

        <div className="pt-4 flex justify-center">
          <Link href="/startup/new">
            <Button variant="primary" size="lg" className="px-10 font-bold gap-2 text-base">
              Start Your Venture
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
