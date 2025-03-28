"use client";

// src/hooks/useHeaderScrollBehavior.ts
// 스크롤 위치와 방향에 따라 헤더와 서브네비의 동작을 제어하는 커스텀 훅입니다

import { useState, useEffect, useRef, useCallback } from "react";
import { HEADER_HEIGHT } from "@/constants/layout";

// 스크롤 동작 제어 상수
const ANIMATION_FRAME_TIME = 8; // 애니메이션 프레임 간격 (ms)
const SCROLL_THRESHOLD = 20; // 스크롤 방향 감지 임계값 (px)
const FAST_SCROLL_THRESHOLD = 50; // 빠른 스크롤 감지 임계값 (px)
const SCROLL_LOCK_TIME = 300; // 방향 전환 후 잠금 시간 (ms)
const TOP_MARGIN = 5; // 페이지 최상단 인식 여백 (px)

/**
 * 헤더와 서브네비게이션 바의 스크롤 동작을 제어하는 커스텀 훅
 * @returns { headerTranslateY, subNavTranslateY, isTransitionEnabled }
 */
export function useHeaderScrollBehavior() {
  // 상태 정의
  const [headerTranslateY, setHeaderTranslateY] = useState<number>(0);
  const [subNavTranslateY, setSubNavTranslateY] = useState<number>(0);
  const [isTransitionEnabled, setIsTransitionEnabled] =
    useState<boolean>(false);

  // 참조값 정의
  const prevScrollY = useRef<number>(0);
  const prevHeaderTranslateY = useRef<number>(0);
  const scrollingUp = useRef<boolean>(false);
  const lastFrameTime = useRef<number>(0);
  const lastDirectionChangeTime = useRef<number>(0);
  const headerVisible = useRef<boolean>(true);
  const isTopZone = useRef<boolean>(true);

  /**
   * 스크롤 위치에 따라 헤더/서브네비의 위치와 transition 상태를 계산하고 업데이트
   */
  const updatePositions = useCallback((currentScrollY: number) => {
    const now = Date.now();
    const calculateNewStates = () => {
      const scrollDelta = currentScrollY - prevScrollY.current;
      const isFastScroll = Math.abs(scrollDelta) > FAST_SCROLL_THRESHOLD;

      // 1. 방향 감지 및 디바운싱
      if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
        const newDirection = scrollDelta < 0;

        if (scrollingUp.current !== newDirection) {
          scrollingUp.current = newDirection;
          lastDirectionChangeTime.current = now;
        }
      } else if (now - lastDirectionChangeTime.current < SCROLL_LOCK_TIME) {
        // 방향 전환 후 잠금 시간 내에는 방향 유지
      }

      let newHeaderTranslateY = 0;
      let transitionEnabled = true;

      // 2. 영역별 처리 로직
      // 2-1. 최상단 영역
      if (currentScrollY <= TOP_MARGIN) {
        newHeaderTranslateY = 0;
        transitionEnabled = false;
        isTopZone.current = true;
        headerVisible.current = true;
      }
      // 2-2. 헤더 높이 이내 영역
      else if (currentScrollY <= HEADER_HEIGHT) {
        const wasInTopZone = isTopZone.current;
        isTopZone.current = true;

        if (scrollingUp.current) {
          // 위로 스크롤 시: 헤더 표시
          newHeaderTranslateY = 0;
          headerVisible.current = true;
          transitionEnabled = !wasInTopZone;
        } else {
          // 아래로 스크롤 시: 스크롤 위치에 비례하여 헤더 이동
          const scrollPastMargin = Math.max(0, currentScrollY - TOP_MARGIN);
          newHeaderTranslateY = -Math.min(scrollPastMargin, HEADER_HEIGHT);
          headerVisible.current = newHeaderTranslateY > -HEADER_HEIGHT;
          transitionEnabled = false; // 스크롤을 직접 따라가므로 transition 비활성화
        }
      }
      // 2-3. 헤더 높이 이상 스크롤된 경우
      else {
        const wasInTopZone = isTopZone.current;
        isTopZone.current = false;

        // 경계를 막 넘어가는 상황
        if (wasInTopZone && !scrollingUp.current) {
          newHeaderTranslateY = -HEADER_HEIGHT; // 헤더 숨김
          headerVisible.current = false;
        } else if (wasInTopZone && scrollingUp.current) {
          newHeaderTranslateY = 0; // 헤더 표시
          headerVisible.current = true;
        }
        // 일반적인 스크롤 상황
        else if (!wasInTopZone) {
          if (isFastScroll) {
            newHeaderTranslateY = scrollingUp.current ? 0 : -HEADER_HEIGHT;
            headerVisible.current = scrollingUp.current;
          } else if (scrollingUp.current !== headerVisible.current) {
            newHeaderTranslateY = scrollingUp.current ? 0 : -HEADER_HEIGHT;
            headerVisible.current = scrollingUp.current;
          } else {
            newHeaderTranslateY = headerVisible.current ? 0 : -HEADER_HEIGHT;
          }
        }

        transitionEnabled = true;
      }

      // 서브네비는 헤더와 동일하게 움직임
      const newSubNavTranslateY = newHeaderTranslateY;

      // 이전 값 업데이트
      prevScrollY.current = currentScrollY;
      prevHeaderTranslateY.current = newHeaderTranslateY;

      return { newHeaderTranslateY, newSubNavTranslateY, transitionEnabled };
    };

    // 계산된 값으로 상태 업데이트
    const { newHeaderTranslateY, newSubNavTranslateY, transitionEnabled } =
      calculateNewStates();

    setHeaderTranslateY(newHeaderTranslateY);
    setSubNavTranslateY(newSubNavTranslateY);
    setIsTransitionEnabled(transitionEnabled);
  }, []);

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastFrameTime.current < ANIMATION_FRAME_TIME) {
        return;
      }
      lastFrameTime.current = now;

      animationFrameId = requestAnimationFrame(() => {
        updatePositions(window.scrollY);
      });
    };

    // 초기 설정
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
