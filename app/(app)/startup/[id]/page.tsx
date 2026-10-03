"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { startupService } from "@/lib/startup/startup-service";
import {
  calculateContextCompleteness,
  validateContextStructure,
} from "@/lib/startup/context-utils";
import type { Startup } from "@/lib/startup/startup-types";
import { ContextEditor } from "@/components/startup/ContextEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Trash2,
  Calendar,
  Layers,
  Target,
  Lightbulb,
  CheckCircle2,
  Globe,
  ArrowLeft,
  AlertTriangle,
  Clock,
  Sparkles,
  Sliders,
  CheckSquare,
  HelpCircle,
  TrendingUp,
  Cpu,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function StartupWorkspacePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showContextEditor, setShowContextEditor] = useState(false);

  useEffect(() => {
    async function loadStartup() {
      if (!user || !id) return;
      try {
        const data = await startupService.getStartup(id as string, user.id);
        setStartup(data);
      } catch (err) {
        console.error("Failed to fetch startup workspace:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStartup();
  }, [id, user]);

  const handleDelete = async () => {
    if (!user || !startup) return;
    setIsDeleting(true);
    try {
      await startupService.deleteStartup(startup.id, user.id);
      router.replace("/startup");
    } catch (err) {
      console.error("Failed to delete startup:", err);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center font-poppins text-xs text-[#A1A1AA]">
        Loading venture workspace...
      </div>
    );
  }

  // Access control check (TEST 7)
  if (!startup) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-[#121214] border border-white/10 rounded-3xl font-poppins space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Venture Access Denied</h2>
        <p className="text-xs text-[#A1A1AA] max-w-sm">
          The requested startup venture does not exist or you do not have authorization to access it.
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

  const ctx = startup.context;
  const completeness = calculateContextCompleteness(ctx);
  const validation = validateContextStructure(ctx);

  return (
    <div className="space-y-8 font-poppins">
      {/* SECTION 1: WORKSPACE HEADER BAR */}
      <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="orange" className="font-mono text-xs">
              {startup.domain}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs text-[#A1A1AA]">
              {startup.stage} Stage
            </Badge>
            <Badge
              variant={startup.status === "Active" ? "orange" : "dark"}
              className="text-xs"
            >
              {startup.status}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-poppins">
            {startup.name}
          </h1>

          {ctx.description && (
            <p className="text-sm text-[#A1A1AA] max-w-2xl leading-relaxed">
              {ctx.description}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowContextEditor(true)}
            className="gap-2 font-bold"
          >
            <Edit3 className="w-4 h-4" />
            Edit Context
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* SECTION 2: COMPLETENESS INDICATOR & CONTEXT SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Context Completeness Indicator */}
        <div className="lg:col-span-5 bg-[#121214] border border-[#FF6B00]/30 rounded-3xl p-6 shadow-xl space-y-4 relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Context Completeness
              </span>
              <span className="text-2xl font-extrabold font-mono text-white">
                {completeness.score}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 bg-[#18181B] rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] rounded-full transition-all duration-500"
                style={{ width: `${completeness.score}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-1">
              <span>{completeness.completedCount} of {completeness.totalCount} fields completed</span>
              <span className={validation.isValid ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
                {validation.isValid ? "Valid Core Context" : "Incomplete Core Fields"}
              </span>
            </div>
          </div>

          {/* Missing Fields Pill List */}
          {completeness.missingFields.length > 0 && (
            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono text-[#71717A] uppercase block mb-2">
                Recommended Additions:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {completeness.missingFields.slice(0, 4).map((fld) => (
                  <span
                    key={fld}
                    className="text-[10px] bg-[#18181B] text-[#A1A1AA] border border-white/10 px-2 py-0.5 rounded-lg"
                  >
                    + {fld}
                  </span>
                ))}
                {completeness.missingFields.length > 4 && (
                  <span className="text-[10px] text-[#FF6B00] font-mono">
                    +{completeness.missingFields.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowContextEditor(true)}
            className="w-full gap-2 font-semibold mt-2"
          >
            <Sliders className="w-4 h-4 text-[#FF6B00]" />
            Complete Context
          </Button>
        </div>

        {/* Compact Startup Context Summary Box */}
        <div className="lg:col-span-7 bg-[#121214] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider border-b border-white/10 pb-3">
            <Sparkles className="w-4 h-4" />
            STARTUP CONTEXT SUMMARY
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#71717A] uppercase block">Problem Summary</span>
              <p className="text-white font-medium line-clamp-2 leading-relaxed">
                {ctx.problem}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#71717A] uppercase block">Solution Summary</span>
              <p className="text-white font-medium line-clamp-2 leading-relaxed">
                {ctx.proposedSolution}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#71717A] uppercase block">Target Users</span>
              <p className="text-[#A1A1AA] font-medium line-clamp-1">
                {ctx.targetUsers}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#71717A] uppercase block">Domain & Stage</span>
              <p className="text-[#A1A1AA] font-medium">
                {ctx.domain} • {ctx.stage} Stage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: STRUCTURED CONTEXT SECTIONS */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white font-poppins flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#FF6B00]" />
          Detailed Venture Context Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Problem Context */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white font-poppins">
                Problem Context & Background
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Problem Statement</span>
                <p className="text-white leading-relaxed">{ctx.problem}</p>
              </div>
              {ctx.problemContext && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Background Context</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.problemContext}</p>
                </div>
              )}
              {ctx.currentAlternatives && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Current Alternatives</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.currentAlternatives}</p>
                </div>
              )}
            </div>
          </div>

          {/* 2. Solution & Value Proposition */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white font-poppins">
                Solution & Value Proposition
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Proposed Solution</span>
                <p className="text-white leading-relaxed">{ctx.proposedSolution}</p>
              </div>
              {ctx.keyValueProposition && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Key Value Proposition</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.keyValueProposition}</p>
                </div>
              )}
            </div>
          </div>

          {/* 3. Target Audience & Geography */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <Target className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white font-poppins">
                Target Audience & Geography
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Target Users</span>
                <p className="text-white leading-relaxed">{ctx.targetUsers}</p>
              </div>
              {ctx.primaryCustomer && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Primary Customer Persona</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.primaryCustomer}</p>
                </div>
              )}
              {ctx.targetGeography && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Target Geography</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.targetGeography}</p>
                </div>
              )}
            </div>
          </div>

          {/* 4. Business Context */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <Building2 className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white font-poppins">
                Business & Revenue Context
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Business Model</span>
                <p className="text-[#A1A1AA] leading-relaxed">{ctx.businessModel || "Not specified yet"}</p>
              </div>
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Revenue Model</span>
                <p className="text-[#A1A1AA] leading-relaxed">{ctx.revenueModel || "Not specified yet"}</p>
              </div>
            </div>
          </div>

          {/* 5. Technology Context */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <Cpu className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white font-poppins">
                Technology Context
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Technology Stack & Description</span>
                <p className="text-[#A1A1AA] leading-relaxed">{ctx.technologyDescription || "Not specified yet"}</p>
              </div>
              {ctx.technologyRequirements && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Technology Requirements</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.technologyRequirements}</p>
                </div>
              )}
            </div>
          </div>

          {/* 6. Goals, Assumptions & Constraints */}
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white font-poppins">
                Goals, Assumptions & Constraints
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase font-mono">Short-Term Goals</span>
                <p className="text-[#A1A1AA] leading-relaxed">{ctx.shortTermGoals || "Not specified yet"}</p>
              </div>
              {ctx.assumptions && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Assumptions</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.assumptions}</p>
                </div>
              )}
              {ctx.constraints && (
                <div>
                  <span className="text-[#71717A] block text-[10px] uppercase font-mono">Constraints & Risks</span>
                  <p className="text-[#A1A1AA] leading-relaxed">{ctx.constraints}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timestamps Footer */}
        <div className="flex items-center justify-between text-xs text-[#71717A] pt-4 border-t border-white/10">
          <div className="flex items-center gap-1 font-mono">
            <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Created: {new Date(startup.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Updated: {new Date(startup.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Context Editor Drawer / Modal */}
      {showContextEditor && (
        <ContextEditor
          startup={startup}
          isOpen={showContextEditor}
          onClose={() => setShowContextEditor(false)}
          onSuccess={(updated) => setStartup(updated)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-poppins">
                Delete Venture?
              </h3>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Are you sure you want to delete <span className="text-white font-semibold">{startup.name}</span>? This action will remove the venture context and cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
