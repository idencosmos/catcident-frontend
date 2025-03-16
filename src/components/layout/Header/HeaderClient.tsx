"use client";

import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import { ReactNode } from "react";

interface HeaderClientProps {
  headerHeight: number;
  children: ReactNode;
}

export default function HeaderClient({
  headerHeight,
  children,
}: HeaderClientProps) {
  const { headerOffset } = useHeaderScrollBehavior(headerHeight);

  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur-md"
      style={{
        height: `${headerHeight}px`,
        transform: `translateY(${headerOffset}px)`,
        transition: "transform 0.2s ease-in-out",
      }}
    >
      {children}
    </header>
  );
}
