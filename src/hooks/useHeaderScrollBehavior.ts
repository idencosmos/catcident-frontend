"use client";

/**
 * src/hooks/useHeaderScrollBehavior.ts
 * 스크롤 위치와 방향에 따른 헤더 동작을 제어하는 커스텀 훅
 * 소량 스크롤 시 자연스러운 동작과 iOS 바운스 효과 대응 기능 포함
 */

import { useState, useEffect, useRef } from "react";

export function useHeaderScrollBehavior(
  headerHeight: number,
  options = {
    scrollThreshold: 5, // 스크롤 변화 임계값 (px): 이 값 이상 스크롤 되었을 때만 방향 판단
  }
) {
  const [headerOffset, setHeaderOffset] = useState<number>(0);
  const prevScrollY = useRef<number>(0);
  const scrollingUp = useRef<boolean>(false);
  const { scrollThreshold } = options;

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // iOS 바운스 효과 방지: 음수 스크롤 값 처리
        if (currentScrollY < 0) {
          setHeaderOffset(0);
          prevScrollY.current = 0;
          return;
        }

        // 스크롤 변화량 계산
        const scrollDelta = currentScrollY - prevScrollY.current;

        // 스크롤 방향 감지 (임계값 이상 스크롤된 경우에만)
        if (Math.abs(scrollDelta) >= scrollThreshold) {
          scrollingUp.current = scrollDelta < 0;
        }

        let newOffset = 0;

        // 헤더 높이보다 적게 스크롤된 경우: 스크롤된 만큼만 헤더 숨김
        if (currentScrollY < headerHeight) {
          newOffset = -currentScrollY;
        }
        // 헤더 높이 이상 스크롤된 경우: 스크롤 방향에 따라 처리
        else {
          if (scrollingUp.current) {
            // 위로 스크롤: 헤더를 점진적으로 표시
            const adjustedDelta = Math.abs(scrollDelta);
            newOffset = Math.min(
              0,
              headerOffset + (scrollDelta < 0 ? adjustedDelta : -adjustedDelta)
            );
            newOffset = Math.max(-headerHeight, newOffset);
          } else {
            // 아래로 스크롤: 헤더 완전히 숨김
            const adjustedDelta = Math.abs(scrollDelta);
            newOffset = Math.max(-headerHeight, headerOffset - adjustedDelta);
          }
        }

        setHeaderOffset(newOffset);
        prevScrollY.current = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [headerHeight, headerOffset, scrollThreshold]);

  // 서브네비게이션의 오프셋 계산: 헤더가 완전히 사라지면 서브네비게이션도 헤더 높이만큼 위로 이동
  const subNavOffset =
    headerOffset <= -headerHeight ? -headerHeight : headerOffset;

  return { headerOffset, subNavOffset };
}
