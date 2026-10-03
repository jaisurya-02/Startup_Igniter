"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { startupService } from "@/lib/startup/startup-service";
import type { Startup } from "@/lib/startup/startup-types";
import { StartupForm } from "@/components/startup/StartupForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditStartupPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStartup() {
      if (!user || !id) return;
      try {
        const data = await startupService.getStartup(id as string, user.id);
        setStartup(data);
      } catch (err) {
        console.error("Failed to fetch startup for editing:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStartup();
  }, [id, user]);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center font-poppins text-xs text-[#A1A1AA]">
        Loading venture details...
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-[#121214] border border-white/10 rounded-3xl font-poppins space-y-4">
        <h2 className="text-xl font-bold text-white">Venture Not Found</h2>
        <p className="text-xs text-[#A1A1AA] max-w-sm">
          The requested startup venture does not exist or you do not have permission to edit it.
        </p>
        <Link href="/startup">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to My Ventures
          </Button>
        </Link>
      </div>
    );
  }

  return <StartupForm initialData={startup} isEdit={true} />;
}
