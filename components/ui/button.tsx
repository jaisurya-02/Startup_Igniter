import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:pointer-events-none rounded-xl tracking-wide font-poppins shadow-sm";

    const variants = {
      primary:
        "bg-[#FF6B00] text-white hover:bg-[#e05e00] hover:shadow-[0_0_25px_rgba(255,107,0,0.35)] border border-transparent active:scale-[0.99]",
      secondary:
        "bg-[#18181B] text-[#FFFFFF] hover:bg-[#27272A] border border-white/10 hover:border-[#FF6B00]/40",
      outline:
        "bg-transparent text-[#FF6B00] border border-[#FF6B00]/40 hover:bg-[#FF6B00]/10 hover:border-[#FF6B00]",
      ghost:
        "bg-transparent text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-white/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-lg",
      md: "h-11 px-6 text-sm rounded-xl",
      lg: "h-12 px-8 text-base font-semibold rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
