// 공통 그리드 레이아웃 컴포넌트
// 반응형 그리드 레이아웃을 제공하며, 여러 가지 변형(variant)을 지원합니다.

import React from "react";
import { cn } from "@/lib/utils";

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "condensed" | "spacious" | "home" | "footer" | "list";
}

const Grid: React.FC<GridProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const variantClasses = {
    default:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8",
    condensed:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4",
    spacious:
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8",
    home: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8",
    footer:
      "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8",
    list: "grid grid-cols-1 gap-4 sm:gap-6 md:gap-8",
  };

  return (
    <div className={cn(variantClasses[variant], className)}>{children}</div>
  );
};

export default Grid;
