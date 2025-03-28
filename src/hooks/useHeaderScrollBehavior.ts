// src/hooks/useHeaderScrollBehavior.ts
// 스크롤 위치/방향에 따라 헤더와 서브네비의 표시 상태 및 애니메이션을 제어합니다.
// 헤더는 항상 고정(fixed) 상태를 유지합니다.

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HEADER_HEIGHT } from "@/constants/layout";

// 스크롤 동작 제어 상수
const ANIMATION_FRAME_TIME = 8; // 스크롤 핸들러 실행 최소 간격 (ms)
const SCROLL_THRESHOLD = 20; // 스크롤 방향 감지 임계값 (px)
const FAST_SCROLL_THRESHOLD = 50; // 빠른 스크롤 감지 임계값 (px)
const SCROLL_LOCK_TIME = 300; // 방향 전환 후 짧은 반대 스크롤 무시 시간 (ms)
const TOP_MARGIN = 5; // 페이지 최상단에서 트랜지션 없이 고정될 여백 (px)

/**
 * 헤더/서브네비 스크롤 동작 제어 훅
 * @returns { headerTranslateY, subNavTranslateY, isTransitionEnabled }
 */
export function useHeaderScrollBehavior() {
  const [headerTranslateY, setHeaderTranslateY] = useState<number>(0);
  const [subNavTranslateY, setSubNavTranslateY] = useState<number>(0);
  const [isTransitionEnabled, setIsTransitionEnabled] =
    useState<boolean>(false);

  const prevScrollY = useRef<number>(0);
  const scrollingUp = useRef<boolean>(false);
  const lastFrameTime = useRef<number>(0);
  const lastDirectionChangeTime = useRef<number>(0);
  const headerVisible = useRef<boolean>(true);

  const updatePositions = useCallback((currentScrollY: number) => {
    const now = Date.now();
    const calculateNewStates = () => {
      const scrollDelta = currentScrollY - prevScrollY.current;
      const isFastScroll = Math.abs(scrollDelta) > FAST_SCROLL_THRESHOLD;

      // 1. 방향 감지 및 디바운싱 (Jittering 방지)
      if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
        const newDirection = scrollDelta < 0;
        if (scrollingUp.current !== newDirection) {
          scrollingUp.current = newDirection;
          lastDirectionChangeTime.current = now;
        }
      } else if (now - lastDirectionChangeTime.current < SCROLL_LOCK_TIME) {
        // 잠금 시간 내에는 방향 유지
      }

      let newHeaderTranslateY = 0;
      let transitionEnabled = false;

      // 2. 영역별 처리 로직
      // 2-1. 헤더 높이 이내 영역
      if (currentScrollY <= HEADER_HEIGHT) {
        newHeaderTranslateY = 0; // 항상 헤더 표시
        headerVisible.current = true;
        // 아래 영역에서 위로 올라올 때만 transition 활성화 (부드러운 등장)
        transitionEnabled =
          currentScrollY > TOP_MARGIN && prevScrollY.current > HEADER_HEIGHT;
      }
      // 2-2. 헤더 높이 초과 영역
      else {
        transitionEnabled = true; // 항상 transition 활성화

        // 경계를 아래로 넘어갈 때
        if (prevScrollY.current <= HEADER_HEIGHT && !scrollingUp.current) {
          newHeaderTranslateY = -HEADER_HEIGHT; // 즉시 숨김
          headerVisible.current = false;
        }
        // 일반 스크롤 시 (헤더 높이 초과 영역 내)
        else {
          if (isFastScroll) {
            // 빠른 스크롤 시 즉시 반영
            newHeaderTranslateY = scrollingUp.current ? 0 : -HEADER_HEIGHT;
            headerVisible.current = scrollingUp.current;
          } else if (scrollingUp.current !== headerVisible.current) {
            // 방향 전환 시 반영
            newHeaderTranslateY = scrollingUp.current ? 0 : -HEADER_HEIGHT;
            headerVisible.current = scrollingUp.current;
          } else {
            // 상태 유지
            newHeaderTranslateY = headerVisible.current ? 0 : -HEADER_HEIGHT;
          }
        }
      }

      const newSubNavTranslateY = newHeaderTranslateY;

      // 이전 스크롤 위치 업데이트
      prevScrollY.current = currentScrollY;

      return {
        newHeaderTranslateY,
        newSubNavTranslateY,
        transitionEnabled,
      };
    };

    // 계산된 값으로 상태 업데이트
    const { newHeaderTranslateY, newSubNavTranslateY, transitionEnabled } =
      calculateNewStates();

    setHeaderTranslateY(newHeaderTranslateY);
    setSubNavTranslateY(newSubNavTranslateY);
    setIsTransitionEnabled(transitionEnabled);
  }, []);

  // 스크롤 이벤트 리스너 (requestAnimationFrame으로 최적화)
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const now = Date.now();
      // 프레임 간격 쓰로틀링
      if (now - lastFrameTime.current < ANIMATION_FRAME_TIME) {
        return;
      }
      lastFrameTime.current = now;

      animationFrameId = requestAnimationFrame(() => {
        updatePositions(window.scrollY);
      });
    };

    // 초기 위치 설정
    prevScrollY.current = window.scrollY;
    updatePositions(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updatePositions]);

  return { headerTranslateY, subNavTranslateY, isTransitionEnabled };
}
