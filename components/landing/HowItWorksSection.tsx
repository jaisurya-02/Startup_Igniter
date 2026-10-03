"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Compass, Search, Layers, Play } from "lucide-react";

const STEPS = [
  {
    num: "STEP 01",
    title: "Define Your Venture",
    desc: "Provide the problem, proposed solution, target users and startup domain.",
    icon: Compass,
  },
  {
    num: "STEP 02",
    title: "Analyze",
    desc: "Specialized agents evaluate different dimensions of the startup.",
    icon: Search,
  },
  {
    num: "STEP 03",
    title: "Synthesize",
    desc: "Findings and evidence are combined into structured startup intelligence.",
    icon: Layers,
  },
  {
    num: "STEP 04",
    title: "Execute",
    desc: "Convert analysis into prioritized actions, plans and progress.",
    icon: Play,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-[#121214] border-y border-white/10 font-poppins">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" className="font-mono text-xs">
            WORKFLOW ENGINE
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins">
            How Startup Igniter Works
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA]">
            Four systematic steps to transform raw concepts into execution-ready ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.08 * idx }}
                className="bg-[#18181B] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-lg">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#121214] border border-white/10 flex items-center justify-center text-[#A1A1AA] group-hover:text-[#FF6B00] group-hover:bg-[#FF6B00]/10 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
