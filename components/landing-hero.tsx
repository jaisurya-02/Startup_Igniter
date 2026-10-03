"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LifecycleStepper } from "@/components/lifecycle-stepper";
import { Rocket, ArrowUpRight, Compass, Sparkles } from "lucide-react";

export function LandingHero() {
  return (
    <div className="w-full overflow-hidden bg-[#0A0A0A] text-[#F4F4F5] font-poppins">
      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto">
        {/* Ambient Orange Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF6B00]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-4 left-6 w-28 h-28 bg-dot-matrix opacity-40 pointer-events-none" />

        {/* Top Minimal Brand Identity Bar (No Navbar as requested) */}
        <div className="flex items-center justify-between pb-10 border-b border-white/10 relative z-10 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-wider font-poppins text-white block">
                STARTUP IGNITER
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#FF6B00] uppercase block">
                The Venture Operating System
              </span>
            </div>
          </div>

          <Link href="/dashboard">
            <Badge variant="orange" className="gap-1.5 text-xs font-mono hover:border-[#FF6B00] transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              ENTER DASHBOARD →
            </Badge>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181B] border border-[#FF6B00]/30 text-xs text-[#FF6B00] font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome to Startup Igniter</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins text-white leading-[1.15] tracking-tight">
                An Integrated Platform <br className="hidden sm:inline" />
                For Startups
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-base sm:text-lg text-[#FF6B00] font-semibold leading-relaxed">
                We are the Catalyst that spur the Growth of all the Ecosystem Partners through Symbiotic Relationships.
              </p>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Transform an idea into a structured venture through validation, intelligence, planning and execution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-2 flex flex-wrap gap-4 items-center"
            >
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="px-8 font-bold">
                  Start Building
                </Button>
              </Link>
              <Link href="/startup">
                <Button variant="secondary" size="lg">
                  Explore Startup Igniter
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Multi-Card Rounded Image Collage matching reference UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4 relative"
          >
            {/* Orange background glow behind cards */}
            <div className="absolute -inset-4 bg-[#FF6B00]/15 rounded-3xl -z-10 blur-2xl" />

            <div className="space-y-4">
              {/* Card 1: Team Meeting */}
              <div className="relative h-60 rounded-3xl overflow-hidden shadow-xl border-2 border-white/10 group">
                <Image
                  src="/hero_team.jpg"
                  alt="Startup Team Collaboration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card 2: Innovation Books Stack */}
              <div className="relative h-52 rounded-3xl overflow-hidden shadow-xl border-2 border-white/10 group">
                <Image
                  src="/hero_books.jpg"
                  alt="Startup Innovation Books"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              {/* Card 3: Whiteboard Session */}
              <div className="relative h-56 rounded-3xl overflow-hidden shadow-xl border-2 border-white/10 group">
                <Image
                  src="/hero_whiteboard.jpg"
                  alt="Founder Whiteboard Architecture"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card 4: Mentor Dialogue */}
              <div className="relative h-56 rounded-3xl overflow-hidden shadow-xl border-2 border-white/10 group">
                <Image
                  src="/hero_mentor.jpg"
                  alt="Startup Mentors & Founders"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: VENTURE LIFECYCLE STEPPER */}
      <section className="bg-[#121214] py-8 border-y border-white/10">
        <LifecycleStepper />
      </section>

      {/* SECTION 3: WHO WE ARE SECTION */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto">
        <div className="absolute bottom-6 left-6 w-20 h-20 bg-dot-matrix opacity-30 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description with Watermark Rocket */}
          <div className="lg:col-span-7 relative space-y-5">
            {/* Rocket vector watermark background */}
            <div className="absolute top-0 left-1/4 -z-10 opacity-5 text-[#FF6B00] pointer-events-none">
              <Rocket className="w-80 h-80" />
            </div>

            <div>
              <span className="text-sm font-bold text-[#FF6B00] tracking-wide block mb-1 font-poppins uppercase">
                A brief on Startup Igniter
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white">
                Who We Are?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
              Startup Igniter is an incubation center and venture operating ecosystem that has developed a unique multi-agent delivery model aimed at building entrepreneurship skills at grassroots levels. We facilitate training, mentoring, research, market validation, and pitch creation for student founders and innovators.
            </p>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
              Our multi-agent platform coordinates specialized agents across ideation, research, feasibility, funding, and go-to-market execution—turning raw ideas into execution-ready ventures.
            </p>

            <div className="pt-2">
              <Link href="/dashboard">
                <Button variant="secondary" className="gap-2 border-[#FF6B00]/30 hover:border-[#FF6B00]">
                  Learn About Our Multi-Agent OS
                  <ArrowUpRight className="w-4 h-4 text-[#FF6B00]" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image Feature Stack */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 relative">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
              <Image
                src="/hero_mentor.jpg"
                alt="Incubation Dialogue"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FF6B00]/40 -mt-10 ml-8">
              <Image
                src="/hero_team.jpg"
                alt="Founders Working"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: IMPACT & FLOATING METRICS SECTION */}
      <section className="bg-gradient-to-b from-[#121214] to-[#0A0A0A] px-6 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Title with Highlighted Text Pill matching reference image */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-poppins text-white leading-tight">
              We help{" "}
              <span className="bg-[#FF6B00] text-white px-4 py-1 rounded-2xl inline-block shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                startups launch
              </span>{" "}
              and scale their business
            </h2>
            <p className="text-base text-[#A1A1AA] max-w-lg">
              Empowering students, researchers, and aspiring founders with AI-orchestrated strategy and execution tools.
            </p>
          </div>

          {/* Right Metric Grid Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#FF6B00]/50 transition-all group">
              <div className="text-3xl font-extrabold font-poppins text-[#FF6B00] mb-1 group-hover:scale-105 transition-transform">
                50+
              </div>
              <div className="text-sm font-semibold text-white">
                Startups Graduated
              </div>
            </div>

            <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#FF6B00]/50 transition-all group">
              <div className="text-3xl font-extrabold font-poppins text-[#FF6B00] mb-1 group-hover:scale-105 transition-transform">
                100+
              </div>
              <div className="text-sm font-semibold text-white">
                Mentors and Investors
              </div>
            </div>

            <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#FF6B00]/50 transition-all group">
              <div className="text-3xl font-extrabold font-poppins text-[#FF6B00] mb-1 group-hover:scale-105 transition-transform">
                150+
              </div>
              <div className="text-sm font-semibold text-white">
                Startups Enrolled
              </div>
            </div>

            <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 shadow-lg hover:border-[#FF6B00]/50 transition-all group">
              <div className="text-3xl font-extrabold font-[#FF6B00] mb-1 group-hover:scale-105 transition-transform font-poppins">
                100+
              </div>
              <div className="text-sm font-semibold text-white">
                Startup Events Done
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] text-white py-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A] gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FF6B00] font-poppins">STARTUP IGNITER</span>
            <span>— Phase 1 Application Shell</span>
          </div>
          <div>
            <span>© 2026 Startup Igniter. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
