"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Search,
  Users,
  FileCode,
  BookOpen,
  CheckSquare,
  FileText,
  Cpu,
  Scale,
  Coins,
  Megaphone,
  Target,
} from "lucide-react";

const DISCONNECTED_TOOLS = [
  { title: "Idea Validation", icon: Lightbulb },
  { title: "Market Research", icon: Search },
  { title: "Competitor Analysis", icon: Users },
  { title: "Patent Search", icon: FileCode },
  { title: "Research Review", icon: BookOpen },
  { title: "Feasibility", icon: CheckSquare },
  { title: "Business Planning", icon: FileText },
  { title: "MVP Planning", icon: Cpu },
  { title: "Legal Guidance", icon: Scale },
  { title: "Funding", icon: Coins },
  { title: "Marketing", icon: Megaphone },
  { title: "Go-To-Market", icon: Target },
];

export function ProblemSection() {
  return (
    <section id="about" className="py-20 px-6 bg-[#121214] border-y border-white/10 font-poppins relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" className="font-mono text-xs">
            THE FRAGMENTATION PROBLEM
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-poppins">
            Building a startup shouldn&apos;t require ten disconnected platforms.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Early-stage founders waste months juggling fragmented tools, spreadsheets, and contextless AI chats. Startup Igniter unifies every phase into a connected, intelligent venture workflow.
          </p>
        </div>

        {/* 12 Disconnected Activities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {DISCONNECTED_TOOLS.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * idx }}
                className="bg-[#18181B] border border-white/10 rounded-2xl p-4 text-center hover:border-[#FF6B00]/40 hover:bg-[#1E1E24] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#121214] border border-white/10 flex items-center justify-center text-[#A1A1AA] group-hover:text-[#FF6B00] group-hover:bg-[#FF6B00]/10 transition-all mx-auto mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white block">
                  {tool.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Unified Workflow Callout Banner */}
        <div className="bg-[#18181B] border border-[#FF6B00]/30 rounded-3xl p-8 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute -inset-1 bg-[#FF6B00]/10 blur-xl -z-10" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-poppins">
            One Connected Venture Operating System
          </h3>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto">
            Instead of re-explaining your startup context to separate agents, Startup Igniter retains your venture knowledge across ideation, research, feasibility, planning, and execution.
          </p>
        </div>
      </div>
    </section>
  );
}
