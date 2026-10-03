import {
  LayoutDashboard,
  Rocket,
  PlusCircle,
  Lightbulb,
  TrendingUp,
  FileSearch,
  ShieldCheck,
  Building2,
  Cpu,
  Coins,
  Megaphone,
  LineChart,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Startup overview will appear here.",
      },
    ],
  },
  {
    section: "VENTURE",
    items: [
      {
        label: "My Startup",
        href: "/startup",
        icon: Rocket,
        description: "Startup workspace will appear here.",
      },
      {
        label: "New Startup",
        href: "/startup/new",
        icon: PlusCircle,
        description: "Startup creation wizard will appear here.",
      },
    ],
  },
  {
    section: "INTELLIGENCE",
    items: [
      {
        label: "Idea Validation",
        href: "/analysis/validation",
        icon: Lightbulb,
        description: "Idea validation functionality will be implemented in a later phase.",
      },
      {
        label: "Market Intelligence",
        href: "/analysis/market",
        icon: TrendingUp,
        description: "Market research functionality will be implemented in a later phase.",
      },
      {
        label: "Research & Patents",
        href: "/analysis/research",
        icon: FileSearch,
        description: "Patent & literature search functionality will be implemented in a later phase.",
      },
      {
        label: "Feasibility",
        href: "/analysis/feasibility",
        icon: ShieldCheck,
        description: "Technical & business feasibility analysis will be implemented in a later phase.",
      },
    ],
  },
  {
    section: "PLANNING",
    items: [
      {
        label: "Business Model",
        href: "/planning/business",
        icon: Building2,
        description: "Business model generation will be implemented in a later phase.",
      },
      {
        label: "MVP & Technology",
        href: "/planning/mvp",
        icon: Cpu,
        description: "MVP roadmap and tech stack planning will be implemented in a later phase.",
      },
    ],
  },
  {
    section: "GROWTH",
    items: [
      {
        label: "Funding",
        href: "/funding",
        icon: Coins,
        description: "Funding readiness and investor deck planning will be implemented in a later phase.",
      },
      {
        label: "Go-To-Market",
        href: "/go-to-market",
        icon: Megaphone,
        description: "Go-to-market strategy planning will be implemented in a later phase.",
      },
      {
        label: "Progress",
        href: "/progress",
        icon: LineChart,
        description: "Venture progress monitoring will be implemented in a later phase.",
      },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        description: "System and workspace settings will appear here.",
      },
    ],
  },
];

export function getNavItemByPath(pathname: string): NavItem | undefined {
  for (const section of NAVIGATION_CONFIG) {
    const found = section.items.find((item) => item.href === pathname);
    if (found) return found;
  }
  return undefined;
}
