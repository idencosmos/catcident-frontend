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
    <>
      <header
        className="fixed top-0 z-50 w-full border-b bg-background backdrop-blur-md"
        style={{
          height: `${headerHeight}px`,
          transform: `translateY(${headerOffset}px)`,
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {children}
      </header>
      {/* 헤더 높이만큼 여백 추가로 콘텐츠 겹침 방지 */}
      <div style={{ paddingTop: `${headerHeight}px` }} />
    </>
  );
}
