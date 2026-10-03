import { apiClient, USE_MOCK_API } from "@/lib/api/client";
import type {
  Startup,
  StartupContext,
  CreateStartupInput,
  UpdateStartupInput,
} from "./startup-types";

const STORAGE_STARTUPS_KEY = "startup_igniter_dev_startups";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function initializeContextFromInput(input: CreateStartupInput): StartupContext {
  return {
    startupName: input.name.trim(),
    domain: input.domain.trim(),
    stage: input.stage,
    description: input.description?.trim() || "",
    problem: input.problem.trim(),
    proposedSolution: input.solution.trim(),
    targetUsers: input.targetUsers.trim(),
    problemContext: "",
    currentAlternatives: "",
    keyValueProposition: "",
    primaryCustomer: "",
    targetGeography: "",
    businessModel: "",
    revenueModel: "",
    technologyDescription: "",
    technologyRequirements: "",
    shortTermGoals: "",
    longTermGoals: "",
    assumptions: "",
    constraints: "",
  };
}

/**
 * Ensure startup record has valid context structure
 */
function ensureContext(startup: Startup): Startup {
  if (!startup.context) {
    startup.context = {
      startupName: startup.name,
      domain: startup.domain,
      stage: startup.stage,
      description: startup.description || "",
      problem: startup.problem,
      proposedSolution: startup.solution,
      targetUsers: startup.targetUsers,
    };
  }
  return startup;
}

function getStoredStartups(): Startup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_STARTUPS_KEY);
    if (!raw) return [];
    const list: Startup[] = JSON.parse(raw);
    return list.map(ensureContext);
  } catch {
    return [];
  }
}

function saveStoredStartups(startups: Startup[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_STARTUPS_KEY, JSON.stringify(startups));
}

export const startupService = {
  /**
   * Helper to initialize context from input data
   */
  initializeStartupContext(input: CreateStartupInput): StartupContext {
    return initializeContextFromInput(input);
  },

  /**
   * Create a new startup with initialized StartupContext
   */
  async createStartup(
    userId: string,
    input: CreateStartupInput
  ): Promise<Startup> {
    if (!userId) {
      throw new Error("User must be authenticated to create a venture.");
    }

    const context = initializeContextFromInput(input);

    if (USE_MOCK_API) {
      await delay(300);

      const startups = getStoredStartups();

      const newStartup: Startup = {
        id: `vtr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        userId,
        name: input.name.trim(),
        problem: input.problem.trim(),
        solution: input.solution.trim(),
        targetUsers: input.targetUsers.trim(),
        domain: input.domain.trim(),
        stage: input.stage,
        description: input.description?.trim() || "",
        status: "Active",
        context,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      startups.push(newStartup);
      saveStoredStartups(startups);

      return newStartup;
    }

    return apiClient.post<Startup>("/api/startups", { ...input, context });
  },

  /**
   * Get single startup by ID (with user ownership enforcement)
   */
  async getStartup(id: string, userId: string): Promise<Startup | null> {
    if (USE_MOCK_API) {
      const startups = getStoredStartups();
      const found = startups.find((s) => s.id === id && s.userId === userId);
      return found ? ensureContext(found) : null;
    }

    try {
      const result = await apiClient.get<Startup>(`/api/startups/${id}`);
      return result ? ensureContext(result) : null;
    } catch {
      return null;
    }
  },

  /**
   * Get structured StartupContext directly
   */
  async getStartupContext(
    startupId: string,
    userId: string
  ): Promise<StartupContext | null> {
    const startup = await this.getStartup(startupId, userId);
    return startup ? startup.context : null;
  },

  /**
   * Get all startups for user
   */
  async getUserStartups(userId: string): Promise<Startup[]> {
    if (!userId) return [];

    if (USE_MOCK_API) {
      const startups = getStoredStartups();
      return startups.filter((s) => s.userId === userId);
    }

    try {
      const list = await apiClient.get<Startup[]>("/api/startups");
      return list.map(ensureContext);
    } catch {
      return [];
    }
  },

  /**
   * Update StartupContext without overwriting unmodified fields
   */
  async updateStartupContext(
    startupId: string,
    userId: string,
    contextInput: Partial<StartupContext>
  ): Promise<Startup> {
    if (USE_MOCK_API) {
      await delay(300);

      const startups = getStoredStartups();
      const index = startups.findIndex(
        (s) => s.id === startupId && s.userId === userId
      );

      if (index === -1) {
        throw new Error("Startup venture not found or unauthorized.");
      }

      const existing = ensureContext(startups[index]);

      const updatedContext: StartupContext = {
        ...existing.context,
        ...contextInput,
        startupName: contextInput.startupName || (contextInput.problem ? (contextInput.startupName || existing.context.startupName) : existing.context.startupName),
        domain: contextInput.domain || existing.context.domain,
        stage: contextInput.stage || existing.context.stage,
        problem: contextInput.problem || existing.context.problem,
        proposedSolution: contextInput.proposedSolution || existing.context.proposedSolution,
        targetUsers: contextInput.targetUsers || existing.context.targetUsers,
      };

      const updatedStartup: Startup = {
        ...existing,
        name: updatedContext.startupName,
        domain: updatedContext.domain,
        stage: updatedContext.stage,
        problem: updatedContext.problem,
        solution: updatedContext.proposedSolution,
        targetUsers: updatedContext.targetUsers,
        description: updatedContext.description !== undefined ? updatedContext.description : existing.description,
        context: updatedContext,
        updatedAt: new Date().toISOString(),
      };

      startups[index] = updatedStartup;
      saveStoredStartups(startups);

      return updatedStartup;
    }

    return apiClient.put<Startup>(`/api/startups/${startupId}/context`, contextInput);
  },

  /**
   * Update general startup metadata
   */
  async updateStartup(
    id: string,
    userId: string,
    input: UpdateStartupInput
  ): Promise<Startup> {
    if (USE_MOCK_API) {
      await delay(300);

      const startups = getStoredStartups();
      const index = startups.findIndex((s) => s.id === id && s.userId === userId);

      if (index === -1) {
        throw new Error("Startup venture not found or unauthorized.");
      }

      const existing = ensureContext(startups[index]);

      const updatedContext: StartupContext = {
        ...existing.context,
        ...(input.context || {}),
        startupName: input.name !== undefined ? input.name.trim() : existing.context.startupName,
        domain: input.domain !== undefined ? input.domain.trim() : existing.context.domain,
        stage: input.stage !== undefined ? input.stage : existing.context.stage,
        problem: input.problem !== undefined ? input.problem.trim() : existing.context.problem,
        proposedSolution: input.solution !== undefined ? input.solution.trim() : existing.context.proposedSolution,
        targetUsers: input.targetUsers !== undefined ? input.targetUsers.trim() : existing.context.targetUsers,
        description: input.description !== undefined ? input.description.trim() : existing.context.description,
      };

      const updatedStartup: Startup = {
        ...existing,
        name: updatedContext.startupName,
        domain: updatedContext.domain,
        stage: updatedContext.stage,
        problem: updatedContext.problem,
        solution: updatedContext.proposedSolution,
        targetUsers: updatedContext.targetUsers,
        description: updatedContext.description,
        status: input.status !== undefined ? input.status : existing.status,
        context: updatedContext,
        updatedAt: new Date().toISOString(),
      };

      startups[index] = updatedStartup;
      saveStoredStartups(startups);

      return updatedStartup;
    }

    return apiClient.put<Startup>(`/api/startups/${id}`, input);
  },

  /**
   * Delete startup
   */
  async deleteStartup(id: string, userId: string): Promise<boolean> {
    if (USE_MOCK_API) {
      await delay(300);

      const startups = getStoredStartups();
      const filtered = startups.filter((s) => !(s.id === id && s.userId === userId));

      saveStoredStartups(filtered);
      return true;
    }

    try {
      await apiClient.delete(`/api/startups/${id}`);
      return true;
    } catch {
      return false;
    }
  },
};
