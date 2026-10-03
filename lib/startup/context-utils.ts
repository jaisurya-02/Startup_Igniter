import type { StartupContext, ContextCompleteness } from "./startup-types";

const CONTEXT_FIELD_LABELS: Record<keyof StartupContext, string> = {
  startupName: "Startup Name",
  domain: "Industry Domain",
  stage: "Venture Stage",
  description: "Short Description",
  problem: "Problem Statement",
  problemContext: "Problem Context",
  currentAlternatives: "Current Alternatives",
  proposedSolution: "Proposed Solution",
  keyValueProposition: "Key Value Proposition",
  targetUsers: "Target Users",
  primaryCustomer: "Primary Customer Persona",
  targetGeography: "Target Geography",
  businessModel: "Business Model",
  revenueModel: "Revenue Model",
  technologyDescription: "Technology Description",
  technologyRequirements: "Technology Requirements",
  shortTermGoals: "Short-Term Goals",
  longTermGoals: "Long-Term Goals",
  assumptions: "Assumptions",
  constraints: "Constraints",
};

// Key fields evaluated for completeness metric
const TRACKED_FIELDS: Array<keyof StartupContext> = [
  "problem",
  "proposedSolution",
  "targetUsers",
  "domain",
  "problemContext",
  "currentAlternatives",
  "keyValueProposition",
  "primaryCustomer",
  "targetGeography",
  "businessModel",
  "revenueModel",
  "technologyDescription",
  "shortTermGoals",
  "assumptions",
];

export function calculateContextCompleteness(
  context: StartupContext
): ContextCompleteness {
  const completedFields: string[] = [];
  const missingFields: string[] = [];

  for (const field of TRACKED_FIELDS) {
    const val = context[field];
    if (val && typeof val === "string" && val.trim().length > 0) {
      completedFields.push(CONTEXT_FIELD_LABELS[field] || field);
    } else {
      missingFields.push(CONTEXT_FIELD_LABELS[field] || field);
    }
  }

  const completedCount = completedFields.length;
  const totalCount = TRACKED_FIELDS.length;
  const score = Math.round((completedCount / totalCount) * 100);

  return {
    score,
    completedCount,
    totalCount,
    completedFields,
    missingFields,
  };
}

export function validateContextStructure(context: StartupContext): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!context.problem || context.problem.trim().length < 5) {
    errors.push("Problem statement is missing or too short.");
  }

  if (!context.proposedSolution || context.proposedSolution.trim().length < 5) {
    errors.push("Proposed solution is missing or too short.");
  }

  if (!context.targetUsers || context.targetUsers.trim().length < 3) {
    errors.push("Target users description is missing.");
  }

  if (!context.domain || context.domain.trim().length < 2) {
    errors.push("Industry domain is missing.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
