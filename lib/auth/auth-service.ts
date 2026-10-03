import { apiClient, USE_MOCK_API } from "@/lib/api/client";
import type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "./auth-types";

// Key constants for development storage
const STORAGE_CURRENT_USER_KEY = "startup_igniter_current_user";
const STORAGE_USERS_KEY = "startup_igniter_dev_users";
const STORAGE_TOKEN_KEY = "startup_igniter_token";

/**
 * Helper to simulate network latency in dev mode
 */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Helper to fetch stored dev users from localStorage
 */
function getDevUsers(): Array<User & { passwordHash: string }> {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Helper to save dev users to localStorage
 */
function saveDevUsers(users: Array<User & { passwordHash: string }>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    if (!data.name || !data.email || !data.password || !data.role) {
      throw new Error("All fields are required.");
    }

    if (USE_MOCK_API) {
      await delay(400);

      const users = getDevUsers();
      const existing = users.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );

      if (existing) {
        throw new Error("An account with this email address already exists.");
      }

      const newUser: User = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        role: data.role,
        createdAt: new Date().toISOString(),
      };

      // Store in dev users list
      users.push({ ...newUser, passwordHash: data.password });
      saveDevUsers(users);

      // Set current active session
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(newUser));
        localStorage.setItem(STORAGE_TOKEN_KEY, `dev_token_${newUser.id}`);
      }

      return { user: newUser, token: `dev_token_${newUser.id}` };
    }

    // Real FastAPI backend endpoint call (Phase 6)
    return apiClient.post<AuthResponse>("/auth/register", data);
  },

  /**
   * Log in an existing user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error("Please enter both email and password.");
    }

    if (USE_MOCK_API) {
      await delay(400);

      const users = getDevUsers();
      const userRecord = users.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
      );

      if (!userRecord || userRecord.passwordHash !== credentials.password) {
        throw new Error("Invalid email or password. Please check your credentials.");
      }

      const { passwordHash: _, ...user } = userRecord;

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
        localStorage.setItem(STORAGE_TOKEN_KEY, `dev_token_${user.id}`);
      }

      return { user, token: `dev_token_${user.id}` };
    }

    // Real FastAPI backend endpoint call (Phase 6)
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  /**
   * Log out current user
   */
  async logout(): Promise<void> {
    if (USE_MOCK_API) {
      await delay(200);
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
      }
      return;
    }

    // Real FastAPI backend endpoint call (Phase 6)
    try {
      await apiClient.post("/auth/logout");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
      }
    }
  },

  /**
   * Get current authenticated user session
   */
  async getCurrentUser(): Promise<User | null> {
    if (USE_MOCK_API) {
      if (typeof window === "undefined") return null;
      try {
        const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }

    // Real FastAPI backend endpoint call (Phase 6)
    try {
      return await apiClient.get<User>("/auth/me");
    } catch {
      return null;
    }
  },

  /**
   * Request password reset link
   */
  async forgotPassword(email: string): Promise<void> {
    if (!email || !email.includes("@")) {
      throw new Error("Please provide a valid email address.");
    }

    if (USE_MOCK_API) {
      await delay(400);
      // Simulates sending reset email cleanly
      return;
    }

    return apiClient.post("/auth/forgot-password", { email });
  },
};
