"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Cpu, Network, Bot } from "lucide-react";

const SPECIALIZED_AGENTS = [
  { name: "Idea Validation Agent", type: "Ideation & Market Need" },
  { name: "Market Research Agent", type: "Industry & Demand Signals" },
  { name: "Competitor Agent", type: "Landscape & Positioning" },
  { name: "Patent Agent", type: "Prior Art & IP Scan" },
  { name: "Research Agent", type: "Academic Literature Review" },
  { name: "Technical Feasibility Agent", type: "Architecture & Stack Audit" },
  { name: "Business Agent", type: "Business Model & Monetization" },
  { name: "Financial Agent", type: "Unit Economics & Pricing" },
  { name: "Legal Agent", type: "Compliance & Regulatory Check" },
  { name: "MVP Agent", type: "Feature Scope & Tech Roadmap" },
  { name: "Funding Agent", type: "Investor & Grant Readiness" },
  { name: "Go-To-Market Agent", type: "Acquisition & Launch Strategy" },
  { name: "Critic Agent", type: "Validation & Risk Challenge" },
  { name: "Synthesis Agent", type: "Cross-Agent Intelligence Fusion" },
  { name: "Progress Agent", type: "Milestone & Execution Monitor" },
];

export function AgentSection() {
  return (
    <section id="agents" className="py-20 px-6 max-w-7xl mx-auto font-poppins">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <Badge variant="orange" className="font-mono text-xs">
          SYSTEM ARCHITECTURE ROADMAP
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-poppins">
          Specialized intelligence. One startup context.
        </h2>
        <p className="text-base sm:text-lg text-[#A1A1AA]">
          Startup Igniter coordinates dedicated AI agents around a shared venture memory rather than isolated chats.
        </p>
      </div>

      {/* Featured Orchestrator Agent Banner */}
      <div className="bg-[#121214] border border-[#FF6B00]/40 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/10 blur-3xl -z-0 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF6B00]/30">
            <Network className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white font-poppins">
                Orchestrator Agent
              </h3>
              <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/15 px-2 py-0.5 rounded-full uppercase">
                Core Master Controller
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
              Responsible for coordinating specialized sub-agents according to your venture&apos;s current development stage and task context. The Orchestrator manages task routing, evidence retrieval, and agent synthesis.
            </p>
          </div>
        </div>
      </div>

      {/* 15 Specialized Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {SPECIALIZED_AGENTS.map((agent, idx) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.03 * idx }}
            className="bg-[#121214] border border-white/10 rounded-2xl p-4 hover:border-[#FF6B00]/40 hover:bg-[#18181B] transition-all group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FF6B00] transition-colors" />
              <h4 className="text-xs font-bold text-white truncate font-poppins">
                {agent.name}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#A1A1AA] block truncate">
              {agent.type}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
