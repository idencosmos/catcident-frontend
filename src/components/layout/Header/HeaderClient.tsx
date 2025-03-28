"use client";

// src/components/layout/Header/HeaderClient.tsx
// 헤더의 클라이언트 사이드 기능과 스크롤 동작을 담당하는 컴포넌트입니다

import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import { ReactNode } from "react";
import { HEADER_HEIGHT } from "@/constants/layout";

interface HeaderClientProps {
  children: ReactNode;
}

export default function HeaderClient({ children }: HeaderClientProps) {
  const { headerTranslateY, isTransitionEnabled } = useHeaderScrollBehavior();

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full border-b bg-background backdrop-blur-md"
        style={{
          height: `${HEADER_HEIGHT}px`,
          transform: `translateY(${headerTranslateY}px)`,
          transition: isTransitionEnabled
            ? "transform 0.2s ease-in-out"
            : "none",
        }}
      >
        {children}
      </header>
      {/* 헤더 높이만큼 여백 추가 */}
      <div style={{ height: `${HEADER_HEIGHT}px` }} />
    </>
  );
}
