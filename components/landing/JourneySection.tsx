"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  FileSearch,
  ShieldCheck,
  Building2,
  Cpu,
  Coins,
  Megaphone,
  Rocket,
  ArrowRight,
} from "lucide-react";

const STAGES = [
  {
    num: "01",
    title: "IDEA",
    desc: "Define concept, vision, problem statement & value proposition.",
    icon: Lightbulb,
  },
  {
    num: "02",
    title: "VALIDATION",
    desc: "Evaluate market signals, customer pain points & core hypotheses.",
    icon: CheckCircle2,
  },
  {
    num: "03",
    title: "MARKET INTELLIGENCE",
    desc: "Audit target market size, competitors, dynamics & trends.",
    icon: TrendingUp,
  },
  {
    num: "04",
    title: "RESEARCH",
    desc: "Scan patent databases, academic papers & prior art literature.",
    icon: FileSearch,
  },
  {
    num: "05",
    title: "FEASIBILITY",
    desc: "Assess technical, financial, operational & legal viability.",
    icon: ShieldCheck,
  },
  {
    num: "06",
    title: "VENTURE PLANNING",
    desc: "Formulate business models, unit economics & monetization.",
    icon: Building2,
  },
  {
    num: "07",
    title: "MVP",
    desc: "Outline core product specs, tech stack & development roadmap.",
    icon: Cpu,
  },
  {
    num: "08",
    title: "FUNDING",
    desc: "Prepare investor pitch decks, grant applications & readiness.",
    icon: Coins,
  },
  {
    num: "09",
    title: "GO-TO-MARKET",
    desc: "Structure positioning, marketing channels & launch strategy.",
    icon: Megaphone,
  },
  {
    num: "10",
    title: "EXECUTION",
    desc: "Monitor development progress, track KPIs & recommend actions.",
    icon: Rocket,
  },
];

export function JourneySection() {
  return (
    <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto font-poppins">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <Badge variant="orange" className="font-mono text-xs">
          VENTURE PIPELINE
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins">
          From Idea to Execution
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA]">
          A structured 10-stage startup lifecycle guided by specialized intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * idx }}
              className="bg-[#121214] border border-white/10 rounded-2xl p-5 hover:border-[#FF6B00]/40 hover:bg-[#18181B] transition-all flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#FF6B00]">
                    {stage.num}
                  </span>
                  <div className="p-2 rounded-xl bg-[#18181B] text-[#A1A1AA] group-hover:bg-[#FF6B00] group-hover:text-white transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 font-poppins tracking-wide">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              {idx < STAGES.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#71717A] group-hover:text-[#FF6B00] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
