"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { startupService } from "@/lib/startup/startup-service";
import type { Startup } from "@/lib/startup/startup-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, PlusCircle, ArrowRight, Calendar, Compass, Layers } from "lucide-react";

export default function StartupsListPage() {
  const { user } = useAuth();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStartups() {
      if (!user) return;
      try {
        const data = await startupService.getUserStartups(user.id);
        setStartups(data);
      } catch (err) {
        console.error("Failed to load startups:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStartups();
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center font-poppins text-xs text-[#A1A1AA]">
        Loading your ventures...
      </div>
    );
  }

  // EMPTY STATE
  if (startups.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#121214] border border-white/10 rounded-3xl shadow-xl font-poppins">
        <div className="w-16 h-16 rounded-2xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] mb-5 shadow-lg">
          <Rocket className="w-8 h-8" />
        </div>

        <Badge variant="orange" className="mb-4">
          VENTURE WORKSPACE
        </Badge>

        <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-2">
          No ventures yet.
        </h2>

        <p className="text-sm text-[#A1A1AA] max-w-md mb-6 leading-relaxed">
          Create your first startup entry to initialize the venture context and unlock multi-agent intelligence.
        </p>

        <Link href="/startup/new">
          <Button variant="primary" size="lg" className="font-bold gap-2">
            <PlusCircle className="w-4 h-4" />
            Create Your First Venture
          </Button>
        </Link>
      </div>
    );
  }

  // LIST STATE
  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">
            My Ventures ({startups.length})
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Select a venture to access its workspace and context
          </p>
        </div>

        <Link href="/startup/new">
          <Button variant="primary" size="sm" className="font-bold gap-2">
            <PlusCircle className="w-4 h-4" />
            Create New Venture
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <Link
            key={startup.id}
            href={`/startup/${startup.id}`}
            className="group bg-[#121214] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B00]/50 hover:bg-[#18181B] transition-all flex flex-col justify-between shadow-lg relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#FF6B00] uppercase font-bold tracking-wider block mb-1">
                    {startup.domain}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF6B00] transition-colors font-poppins">
                    {startup.name}
                  </h3>
                </div>

                <Badge
                  variant={startup.status === "Active" ? "orange" : "dark"}
                  className="text-[10px]"
                >
                  {startup.status}
                </Badge>
              </div>

              <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                {startup.problem}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#71717A]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#A1A1AA]">
                <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{startup.stage} Stage</span>
              </div>

              <div className="flex items-center gap-1 text-[#FF6B00] font-semibold text-xs group-hover:translate-x-1 transition-transform">
                <span>Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
