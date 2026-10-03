"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, GraduationCap, Users, ShieldCheck, Search, Lightbulb } from "lucide-react";

const TARGET_AUDIENCE = [
  { label: "Students", icon: GraduationCap },
  { label: "Founders", icon: Users },
  { label: "Innovators", icon: Lightbulb },
  { label: "Researchers", icon: Search },
  { label: "Startup Teams", icon: ShieldCheck },
];

export function HeroSection() {
  return (
    <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto font-poppins">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6B00]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-6 left-6 w-32 h-32 bg-dot-matrix opacity-40 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline & Action CTA */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="orange" className="mb-4 gap-1.5 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              THE VENTURE OPERATING SYSTEM
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins text-white leading-[1.12] tracking-tight">
              Turn an idea <br className="hidden sm:inline" />
              into a <span className="text-[#FF6B00]">venture.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl"
          >
            Startup Igniter brings validation, market intelligence, research, feasibility, business planning, funding and go-to-market strategy into one intelligent startup development workflow.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="pt-2 flex flex-wrap gap-4 items-center"
          >
            <Link href="/startup/new">
              <Button variant="primary" size="lg" className="px-8 font-bold gap-2">
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <a href="#platform">
              <Button variant="secondary" size="lg">
                Explore Platform
              </Button>
            </a>
          </motion.div>

          {/* Supported Personas Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-6 border-t border-white/10"
          >
            <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider block mb-3 font-mono">
              Designed For Startup Ecosystems
            </span>
            <div className="flex flex-wrap gap-2">
              {TARGET_AUDIENCE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121214] border border-white/10 text-xs font-medium text-[#A1A1AA] hover:border-[#FF6B00]/40 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Multi-Card Image Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
        >
          <div className="absolute -inset-4 bg-[#FF6B00]/15 rounded-3xl -z-10 blur-2xl" />

          <div className="space-y-4">
            <div className="relative h-60 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 group">
              <Image
                src="/hero_team.jpg"
                alt="Startup Team Collaboration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-52 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 group">
              <Image
                src="/hero_books.jpg"
                alt="Startup Books"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 group">
              <Image
                src="/hero_whiteboard.jpg"
                alt="Architecture Whiteboard"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FF6B00]/40 group">
              <Image
                src="/hero_mentor.jpg"
                alt="Incubator Mentor Dialogue"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
