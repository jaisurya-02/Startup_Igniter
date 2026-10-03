"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, CheckCircle2, Search, Cpu, Rocket } from "lucide-react";

interface Step {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const LIFECYCLE_STEPS: Step[] = [
  {
    id: "idea",
    num: "01",
    title: "IDEA",
    description: "Concept & Vision",
    icon: Lightbulb,
  },
  {
    id: "validate",
    num: "02",
    title: "VALIDATE",
    description: "Market Demand",
    icon: CheckCircle2,
  },
  {
    id: "research",
    num: "03",
    title: "RESEARCH",
    description: "Competitor & IP Audit",
    icon: Search,
  },
  {
    id: "build",
    num: "04",
    title: "BUILD",
    description: "Architecture & Roadmap",
    icon: Cpu,
  },
  {
    id: "launch",
    num: "05",
    title: "LAUNCH",
    description: "GTM Acceleration",
    icon: Rocket,
  },
];

export function LifecycleStepper() {
  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      <div className="text-center mb-6">
        <span className="text-xs font-bold tracking-widest text-[#FF6B00] uppercase bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full font-poppins">
          Venture Lifecycle Architecture
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
        {LIFECYCLE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * idx }}
              className="group relative bg-[#121214] border border-white/10 rounded-2xl p-4 hover:border-[#FF6B00]/50 hover:bg-[#18181B] transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#FF6B00]">
                  {step.num}
                </span>
                <div className="p-2 rounded-xl bg-[#18181B] text-[#A1A1AA] group-hover:bg-[#FF6B00] group-hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-sm font-bold tracking-wider text-white mb-1 font-poppins">
                {step.title}
              </h4>
              <p className="text-xs text-[#A1A1AA] leading-relaxed font-poppins">
                {step.description}
              </p>

              {idx < LIFECYCLE_STEPS.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#71717A] group-hover:text-[#FF6B00] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
