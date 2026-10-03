"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { startupService } from "@/lib/startup/startup-service";
import type { StartupContext, Startup } from "@/lib/startup/startup-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Save, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

interface ContextEditorProps {
  startup: Startup;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedStartup: Startup) => void;
}

export function ContextEditor({
  startup,
  isOpen,
  onClose,
  onSuccess,
}: ContextEditorProps) {
  const { user } = useAuth();
  const ctx = startup.context || {};

  const [problem, setProblem] = useState(ctx.problem || startup.problem || "");
  const [problemContext, setProblemContext] = useState(ctx.problemContext || "");
  const [currentAlternatives, setCurrentAlternatives] = useState(ctx.currentAlternatives || "");

  const [proposedSolution, setProposedSolution] = useState(ctx.proposedSolution || startup.solution || "");
  const [keyValueProposition, setKeyValueProposition] = useState(ctx.keyValueProposition || "");

  const [targetUsers, setTargetUsers] = useState(ctx.targetUsers || startup.targetUsers || "");
  const [primaryCustomer, setPrimaryCustomer] = useState(ctx.primaryCustomer || "");
  const [targetGeography, setTargetGeography] = useState(ctx.targetGeography || "");

  const [businessModel, setBusinessModel] = useState(ctx.businessModel || "");
  const [revenueModel, setRevenueModel] = useState(ctx.revenueModel || "");

  const [technologyDescription, setTechnologyDescription] = useState(ctx.technologyDescription || "");
  const [technologyRequirements, setTechnologyRequirements] = useState(ctx.technologyRequirements || "");

  const [shortTermGoals, setShortTermGoals] = useState(ctx.shortTermGoals || "");
  const [longTermGoals, setLongTermGoals] = useState(ctx.longTermGoals || "");

  const [assumptions, setAssumptions] = useState(ctx.assumptions || "");
  const [constraints, setConstraints] = useState(ctx.constraints || "");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("User must be logged in.");
      return;
    }

    if (!problem.trim() || !proposedSolution.trim() || !targetUsers.trim()) {
      setError("Problem, Solution, and Target Users are required core fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await startupService.updateStartupContext(startup.id, user.id, {
        startupName: startup.name,
        domain: startup.domain,
        stage: startup.stage,
        description: startup.description,
        problem: problem.trim(),
        problemContext: problemContext.trim(),
        currentAlternatives: currentAlternatives.trim(),
        proposedSolution: proposedSolution.trim(),
        keyValueProposition: keyValueProposition.trim(),
        targetUsers: targetUsers.trim(),
        primaryCustomer: primaryCustomer.trim(),
        targetGeography: targetGeography.trim(),
        businessModel: businessModel.trim(),
        revenueModel: revenueModel.trim(),
        technologyDescription: technologyDescription.trim(),
        technologyRequirements: technologyRequirements.trim(),
        shortTermGoals: shortTermGoals.trim(),
        longTermGoals: longTermGoals.trim(),
        assumptions: assumptions.trim(),
        constraints: constraints.trim(),
      });

      onSuccess(updated);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save startup context.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#121214] border border-[#FF6B00]/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 font-poppins relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 sticky top-0 bg-[#121214] z-10 pt-1">
          <div>
            <Badge variant="orange" className="font-mono text-[10px] mb-1">
              CONTEXT EDITOR
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins">
              Complete Startup Context: {startup.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: PROBLEM CONTEXT */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#FF6B00] font-poppins uppercase tracking-wider">
              1. Problem Context
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                Problem Statement <span className="text-[#FF6B00]">*</span>
              </label>
              <textarea
                rows={3}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Problem Context & Background
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Why is this problem happening now?"
                  value={problemContext}
                  onChange={(e) => setProblemContext(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Current Existing Alternatives
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Spreadsheets, manual consultants"
                  value={currentAlternatives}
                  onChange={(e) => setCurrentAlternatives(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: SOLUTION & VALUE PROPOSITION */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-[#FF6B00] font-poppins uppercase tracking-wider">
              2. Solution & Value Proposition
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                Proposed Solution <span className="text-[#FF6B00]">*</span>
              </label>
              <textarea
                rows={3}
                value={proposedSolution}
                onChange={(e) => setProposedSolution(e.target.value)}
                className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                Key Value Proposition
              </label>
              <input
                type="text"
                placeholder="e.g. 10x faster market validation at 80% lower cost"
                value={keyValueProposition}
                onChange={(e) => setKeyValueProposition(e.target.value)}
                className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          {/* SECTION 3: TARGET AUDIENCE & GEOGRAPHY */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-[#FF6B00] font-poppins uppercase tracking-wider">
              3. Target Audience & Geography
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                Target Users Description <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type="text"
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
                className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Primary Customer Persona
                </label>
                <input
                  type="text"
                  placeholder="e.g. Early-stage B2B SaaS Founders"
                  value={primaryCustomer}
                  onChange={(e) => setPrimaryCustomer(e.target.value)}
                  className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Target Geography / Market Scope
                </label>
                <input
                  type="text"
                  placeholder="e.g. North America, India, Global"
                  value={targetGeography}
                  onChange={(e) => setTargetGeography(e.target.value)}
                  className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: BUSINESS CONTEXT */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-[#FF6B00] font-poppins uppercase tracking-wider">
              4. Business Context
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Business Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. B2B Subscription SaaS, Marketplace commission"
                  value={businessModel}
                  onChange={(e) => setBusinessModel(e.target.value)}
                  className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Revenue Model & Pricing Strategy
                </label>
                <input
                  type="text"
                  placeholder="e.g. $49/mo Tiered pricing, Usage-based API tokens"
                  value={revenueModel}
                  onChange={(e) => setRevenueModel(e.target.value)}
                  className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: TECHNOLOGY CONTEXT */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-[#FF6B00] font-poppins uppercase tracking-wider">
              5. Technology Context
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Technology Description & Stack
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Next.js, Python FastAPI, Vector DB, LLM Orchestration"
                  value={technologyDescription}
                  onChange={(e) => setTechnologyDescription(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Technology Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. High-performance GPU inference, Real-time RAG"
                  value={technologyRequirements}
                  onChange={(e) => setTechnologyRequirements(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 6: GOALS & ASSUMPTIONS */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-[#FF6B00] font-poppins uppercase tracking-wider">
              6. Goals, Assumptions & Constraints
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Short-Term Goals (Next 3-6 Months)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Launch MVP, acquire 50 beta users"
                  value={shortTermGoals}
                  onChange={(e) => setShortTermGoals(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Long-Term Vision Goals
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Become the dominant venture OS for university incubators"
                  value={longTermGoals}
                  onChange={(e) => setLongTermGoals(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Key Assumptions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Founders are willing to use multi-agent AI for pitch prep"
                  value={assumptions}
                  onChange={(e) => setAssumptions(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                  Known Constraints & Risks
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Limited bootstrap budget, tight regulatory rules"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  className="w-full bg-[#18181B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* Form Submit Footer */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#121214] pb-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="font-bold gap-2"
            >
              {isSubmitting ? "Saving Context..." : "Save Startup Context"}
              {!isSubmitting && <Save className="w-4 h-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
