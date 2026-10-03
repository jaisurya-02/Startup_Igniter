import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "orange" | "dark" | "outline";
}

export function Badge({
  className,
  variant = "orange",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors font-poppins";

  const variants = {
    orange: "bg-[#FF6B00]/15 text-[#FF6B00] border-[#FF6B00]/30",
    dark: "bg-[#18181B] text-[#A1A1AA] border-white/10",
    outline: "bg-transparent text-[#FF6B00] border-[#FF6B00]/40",
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
