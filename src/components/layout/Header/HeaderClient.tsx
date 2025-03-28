// src/components/layout/Header/HeaderClient.tsx
// 헤더의 클라이언트 사이드 기능(스크롤 동작)을 적용하고 UI를 렌더링합니다.
// 스크롤 위치에 따라 헤더의 translateY 및 transition 스타일을 동적으로 변경합니다.

"use client";

import { useHeaderScrollBehavior } from "@/hooks/useHeaderScrollBehavior";
import { ReactNode } from "react";
import { HEADER_HEIGHT } from "@/constants/layout";

interface HeaderClientProps {
  children: ReactNode;
}

export default function HeaderClient({ children }: HeaderClientProps) {
  // 헤더 스크롤 동작 관련 상태 가져오기
  const { headerTranslateY, isTransitionEnabled } = useHeaderScrollBehavior();

  return (
    <>
      {/* 고정 헤더: 스크롤 동작에 따라 위치 및 애니메이션 적용 */}
      <header
        className="fixed top-0 z-50 w-full border-b bg-background backdrop-blur-md"
        style={{
          height: `${HEADER_HEIGHT}px`,
          transform: `translateY(${headerTranslateY}px)`,
          transition: isTransitionEnabled
            ? "transform 0.2s ease-in-out" // 트랜지션 활성화 시 부드러운 이동
            : "none", // 트랜지션 비활성화 시 즉시 이동
        }}
      >
        {children} {/* Header 컴포넌트의 실제 내용 */}
      </header>
      {/* 고정 헤더로 인해 가려지는 콘텐츠 영역 확보용 플레이스홀더 */}
      <div style={{ height: `${HEADER_HEIGHT}px` }} />
    </>
  );
}
