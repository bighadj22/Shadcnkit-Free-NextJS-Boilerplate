import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({ children, className, ...props }: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "relative group inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "h-11 px-8 py-2 text-primary-foreground",
        "bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%] animate-rainbow",
        "border-2 border-transparent",
        // Rainbow glow effect
        "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent before:blur-xl before:opacity-40 before:transition-opacity before:animate-rainbow",
        // Hover effect
        "hover:border-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}