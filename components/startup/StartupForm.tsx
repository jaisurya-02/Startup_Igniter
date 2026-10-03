"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { startupService } from "@/lib/startup/startup-service";
import type {
  Startup,
  StartupStage,
  StartupStatus,
} from "@/lib/startup/startup-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight, Save, Rocket, Compass } from "lucide-react";

interface StartupFormProps {
  initialData?: Startup;
  isEdit?: boolean;
}

const STAGE_OPTIONS: StartupStage[] = [
  "Idea",
  "Validation",
  "Research",
  "Feasibility",
  "MVP",
  "Funding",
  "Launch",
];

const STATUS_OPTIONS: StartupStatus[] = ["Active", "Draft", "Completed"];

export function StartupForm({ initialData, isEdit = false }: StartupFormProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [problem, setProblem] = useState(initialData?.problem || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [targetUsers, setTargetUsers] = useState(initialData?.targetUsers || "");
  const [domain, setDomain] = useState(initialData?.domain || "");
  const [stage, setStage] = useState<StartupStage>(initialData?.stage || "Idea");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<StartupStatus>(initialData?.status || "Active");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in to save a venture.");
      return;
    }

    // Validation checks
    if (!name.trim()) {
      setError("Please enter a startup name.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Startup name must be at least 2 characters long.");
      return;
    }

    if (!problem.trim() || problem.trim().length < 10) {
      setError("Please describe the problem you are solving (minimum 10 characters).");
      return;
    }

    if (!solution.trim() || solution.trim().length < 10) {
      setError("Please describe your proposed solution (minimum 10 characters).");
      return;
    }

    if (!targetUsers.trim()) {
      setError("Please specify your target users or target market.");
      return;
    }

    if (!domain.trim()) {
      setError("Please enter your startup's industry domain.");
      return;
    }

    if (!stage) {
      setError("Please select the current stage of your startup.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEdit && initialData) {
        const updated = await startupService.updateStartup(
          initialData.id,
          user.id,
          {
            name: name.trim(),
            problem: problem.trim(),
            solution: solution.trim(),
            targetUsers: targetUsers.trim(),
            domain: domain.trim(),
            stage,
            description: description.trim(),
            status,
          }
        );
        router.push(`/startup/${updated.id}`);
      } else {
        const created = await startupService.createStartup(user.id, {
          name: name.trim(),
          problem: problem.trim(),
          solution: solution.trim(),
          targetUsers: targetUsers.trim(),
          domain: domain.trim(),
          stage,
          description: description.trim(),
        });
        router.push(`/startup/${created.id}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while saving your venture.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl font-poppins">
      <div className="mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <Badge variant="orange" className="mb-2 font-mono text-[10px]">
            {isEdit ? "UPDATE VENTURE CONTEXT" : "INITIAL VENTURE CONTEXT"}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
            {isEdit ? `Edit Startup: ${initialData?.name}` : "Create New Venture"}
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Define your startup parameters for multi-agent intelligence and strategy
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] shrink-0 hidden sm:flex">
          <Rocket className="w-6 h-6" />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Startup Name & Domain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
              Startup Name <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. HealthPulse AI"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
              Industry Domain <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. HealthTech, FinTech, B2B SaaS"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
            />
          </div>
        </div>

        {/* Current Stage & Status (if Edit) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
              Current Stage <span className="text-[#FF6B00]">*</span>
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as StartupStage)}
              className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
            >
              {STAGE_OPTIONS.map((stg) => (
                <option key={stg} value={stg} className="bg-[#18181B] text-white">
                  {stg} Stage
                </option>
              ))}
            </select>
          </div>

          {isEdit ? (
            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
                Venture Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StartupStatus)}
                className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
              >
                {STATUS_OPTIONS.map((sts) => (
                  <option key={sts} value={sts} className="bg-[#18181B] text-white">
                    {sts}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
                Target Users / Customer Segment <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Remote Medical Clinics, ICU Doctors"
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
                className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
              />
            </div>
          )}
        </div>

        {isEdit && (
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
              Target Users / Customer Segment <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Remote Medical Clinics, ICU Doctors"
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl px-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
            />
          </div>
        )}

        {/* Problem Statement */}
        <div>
          <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
            What problem are you solving? <span className="text-[#FF6B00]">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Clearly describe the core pain point, market inefficiency, or problem your startup addresses..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full bg-[#18181B] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins leading-relaxed"
          />
        </div>

        {/* Proposed Solution */}
        <div>
          <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
            What is your proposed solution? <span className="text-[#FF6B00]">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Describe your product, technology, or unique approach to solving this problem..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full bg-[#18181B] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins leading-relaxed"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-semibold text-[#A1A1AA] mb-2 font-poppins">
            Short Startup Description <span className="text-xs text-[#71717A] font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="A concise 1-2 sentence elevator pitch..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#18181B] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins leading-relaxed"
          />
        </div>

        {/* Form Actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
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
            {isSubmitting ? (
              "Saving Venture..."
            ) : isEdit ? (
              <>
                <Save className="w-4 h-4" />
                Update Venture
              </>
            ) : (
              <>
                Create Venture Workspace
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
