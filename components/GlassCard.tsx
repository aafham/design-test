import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header";
};

export function GlassCard({ children, className = "", as = "div" }: GlassCardProps) {
  const Comp = as;
  return <Comp className={`glass-card ${className}`.trim()}>{children}</Comp>;
}
