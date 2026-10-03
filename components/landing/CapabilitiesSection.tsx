"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  TrendingUp,
  FileSearch,
  ShieldCheck,
  Building2,
  Cpu,
  Coins,
  Megaphone,
  LineChart,
} from "lucide-react";

const CAPABILITIES = [
  {
    title: "Idea Validation",
    description: "Evaluate the problem, customer need, assumptions and innovation potential.",
    icon: Lightbulb,
  },
  {
    title: "Market Intelligence",
    description: "Understand target markets, competitors, market opportunities and trends.",
    icon: TrendingUp,
  },
  {
    title: "Patent & Research",
    description: "Explore related patents, prior art and academic research.",
    icon: FileSearch,
  },
  {
    title: "Feasibility",
    description: "Assess technical, business, financial, operational and legal feasibility.",
    icon: ShieldCheck,
  },
  {
    title: "Business Planning",
    description: "Develop business models, revenue strategies, pricing and venture plans.",
    icon: Building2,
  },
  {
    title: "MVP Planning",
    description: "Define core features, technology requirements and development roadmap.",
    icon: Cpu,
  },
  {
    title: "Funding",
    description: "Identify relevant funding opportunities and prepare for investment.",
    icon: Coins,
  },
  {
    title: "Go-To-Market",
    description: "Develop positioning, marketing, customer acquisition and launch strategies.",
    icon: Megaphone,
  },
  {
    title: "Progress Monitoring",
    description: "Track venture development and determine recommended next actions.",
    icon: LineChart,
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 px-6 bg-[#121214] border-y border-white/10 font-poppins">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" className="font-mono text-xs">
            PLATFORM CAPABILITIES
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins">
            Comprehensive Venture Intelligence
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA]">
            Nine specialized pillars built to accelerate your startup from initial concept to market readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * idx }}
                className="bg-[#18181B] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B00]/40 hover:bg-[#1E1E24] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#121214] border border-white/10 flex items-center justify-center text-[#FF6B00] mb-4 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-poppins">
                  {cap.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
