// src/components/common/Container.tsx
// 다양한 레이아웃 옵션을 제공하는 재사용 가능한 컨테이너 컴포넌트입니다.

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "horizontal" | "narrow";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = "", variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "container p-4 sm:p-6 md:p-8",
      horizontal: "container px-4 sm:px-6 md:px-8",
      narrow: "container px-4 sm:px-6 md:px-8 max-w-4xl mx-auto",
    };

    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
