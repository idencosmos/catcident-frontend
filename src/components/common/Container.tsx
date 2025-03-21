import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "horizontal" | "narrow";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const variantClasses = {
    default: "container p-4 sm:p-6 md:p-8",
    horizontal: "container px-4 sm:px-6 md:px-8",
    narrow: "container px-4 sm:px-6 md:px-8 max-w-4xl mx-auto",
  };

  return (
    <div className={cn(variantClasses[variant], className)}>{children}</div>
  );
};

export default Container;
