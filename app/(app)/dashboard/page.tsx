"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { startupService } from "@/lib/startup/startup-service";
import type { Startup } from "@/lib/startup/startup-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, PlusCircle, ArrowRight, Layers, Compass, ExternalLink } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const userStartups = await startupService.getUserStartups(user.id);
        setStartups(userStartups);
      } catch (err) {
        console.error("Failed to load dashboard startup data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center font-poppins text-xs text-[#A1A1AA]">
        Loading dashboard...
      </div>
    );
  }

  const activeStartup = startups.find((s) => s.status === "Active") || startups[0];

  return (
    <div className="space-y-8 font-poppins">
      {/* Welcome Banner */}
      <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/10 blur-3xl -z-0 pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <Badge variant="orange" className="font-mono text-[10px]">
            VENTURE OPERATING SYSTEM
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl leading-relaxed">
            Manage your startup ventures and prepare initial context for multi-agent validation and research.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Link href="/startup/new">
            <Button variant="primary" size="sm" className="font-bold gap-2">
              <PlusCircle className="w-4 h-4" />
              New Venture
            </Button>
          </Link>
        </div>
      </div>

      {/* Startup Context Recognition Section */}
      {!activeStartup ? (
        /* Empty State */
        <div className="bg-[#121214] border border-white/10 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] mx-auto">
            <Rocket className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white font-poppins">
              Start your first venture
            </h2>
            <p className="text-xs text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
              No active venture found. Create a startup workspace to define your problem statement and target audience.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/startup/new">
              <Button variant="primary" size="md" className="font-bold gap-2">
                Create Startup
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Recognized Active Startup Section */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-poppins">
              Active Venture Workspace
            </h2>
            <Link href="/startup" className="text-xs text-[#FF6B00] hover:underline font-semibold flex items-center gap-1">
              View All ({startups.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#121214] border border-[#FF6B00]/30 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#FF6B00] uppercase font-bold tracking-wider block mb-1">
                  {activeStartup.domain}
                </span>
                <h3 className="text-2xl font-bold text-white font-poppins">
                  {activeStartup.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="orange" className="text-xs">
                  {activeStartup.stage} Stage
                </Badge>
                <Badge variant="outline" className="text-xs text-[#A1A1AA]">
                  {activeStartup.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#18181B] p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#71717A] uppercase block">Problem</span>
                <p className="text-[#A1A1AA] line-clamp-2 leading-relaxed">
                  {activeStartup.problem}
                </p>
              </div>

              <div className="bg-[#18181B] p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#71717A] uppercase block">Solution</span>
                <p className="text-[#A1A1AA] line-clamp-2 leading-relaxed">
                  {activeStartup.solution}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link href={`/startup/${activeStartup.id}`}>
                <Button variant="primary" size="md" className="font-bold gap-2">
                  Open Venture Workspace
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
