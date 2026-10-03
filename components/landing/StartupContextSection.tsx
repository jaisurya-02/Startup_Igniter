"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Database, Cpu, RefreshCw } from "lucide-react";

const CONTEXT_NODES = [
  "Startup Idea",
  "Problem Definition",
  "Customer Profiles",
  "Market Findings",
  "Research & Patents",
  "Feasibility Audit",
  "Business Model",
  "MVP Specs",
  "Funding Strategy",
  "Go-To-Market Plan",
  "Venture Progress",
];

export function StartupContextSection() {
  return (
    <section id="platform" className="py-20 px-6 max-w-7xl mx-auto font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-6 space-y-6">
          <Badge variant="orange" className="font-mono text-xs">
            SYSTEM CORE ARCHITECTURE
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins leading-tight">
            Connected Startup Context
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Unlike standard AI chatbots that forget your business details between prompts, Startup Igniter maintains a persistent, evolving knowledge graph generated throughout your venture journey.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5 bg-[#121214] p-4 rounded-xl border border-white/10">
              <Database className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white font-poppins">Persistent Knowledge Retention</h4>
                <p className="text-xs text-[#A1A1AA]">Every agent contribution enriches the central startup context for downstream tasks.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-[#121214] p-4 rounded-xl border border-white/10">
              <RefreshCw className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white font-poppins">No Redundant Inputs</h4>
                <p className="text-xs text-[#A1A1AA]">Future analyses use previous validation and research findings seamlessly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Context Pipeline Diagram */}
        <div className="lg:col-span-6 bg-[#121214] border border-[#FF6B00]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          <div className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            VENTURE MEMORY FLOW
          </div>

          <div className="space-y-2">
            {CONTEXT_NODES.map((node, idx) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.04 * idx }}
                className="flex flex-col items-center"
              >
                <div className="w-full bg-[#18181B] border border-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-medium text-white hover:border-[#FF6B00]/40 transition-colors">
                  <span className="font-poppins">{node}</span>
                  <span className="font-mono text-[10px] text-[#FF6B00]">STAGE {idx + 1}</span>
                </div>
                {idx < CONTEXT_NODES.length - 1 && (
                  <ArrowDown className="w-3.5 h-3.5 text-[#FF6B00]/60 my-0.5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
