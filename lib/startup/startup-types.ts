export type StartupStage =
  | "Idea"
  | "Validation"
  | "Research"
  | "Feasibility"
  | "MVP"
  | "Funding"
  | "Launch";

export type StartupStatus = "Active" | "Draft" | "Completed";

export interface StartupContext {
  // Basic Information
  startupName: string;
  domain: string;
  stage: StartupStage;
  description?: string;

  // Problem Context
  problem: string;
  problemContext?: string;
  currentAlternatives?: string;

  // Solution & Value Proposition
  proposedSolution: string;
  keyValueProposition?: string;

  // Target Users & Customers
  targetUsers: string;
  primaryCustomer?: string;
  targetGeography?: string;

  // Business Context
  businessModel?: string;
  revenueModel?: string;

  // Technology Context
  technologyDescription?: string;
  technologyRequirements?: string;

  // Goals
  shortTermGoals?: string;
  longTermGoals?: string;

  // Assumptions & Constraints
  assumptions?: string;
  constraints?: string;
}

export interface Startup {
  id: string;
  userId: string;
  name: string;
  problem: string;
  solution: string;
  targetUsers: string;
  domain: string;
  stage: StartupStage;
  description?: string;
  status: StartupStatus;
  context: StartupContext;
  createdAt: string;
  updatedAt: string;
}

export type CreateStartupInput = Omit<
  Startup,
  "id" | "userId" | "status" | "context" | "createdAt" | "updatedAt"
>;

export type UpdateStartupInput = Partial<CreateStartupInput> & {
  status?: StartupStatus;
  context?: Partial<StartupContext>;
};

export interface ContextCompleteness {
  score: number; // 0 to 100
  completedCount: number;
  totalCount: number;
  completedFields: string[];
  missingFields: string[];
}
