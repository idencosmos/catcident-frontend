"use client";

/**
 * src/hooks/useHeaderScrollBehavior.ts
 * 스크롤 위치와 방향에 따른 헤더 동작을 제어하는 커스텀 훅
 */

import { useState, useEffect, useRef, useCallback } from "react";

// 상수 정의
const ANIMATION_FRAME_TIME = 8; // 120fps 기준 프레임 간격
const DAMPING_FACTOR = 1.2; // 헤더 이동 속도 계수 (1.0 = 스크롤과 동일한 속도)
const MAX_SPEED_DESKTOP = 15; // 데스크톱 환경 최대 이동 속도 (px)
const MAX_SPEED_TOUCH = 15; // 터치 기기 최대 이동 속도 (px)
const SCROLL_THRESHOLD_DESKTOP = 15; // 스크롤 방향 감지 임계값 (px) - 데스크톱
const SCROLL_THRESHOLD_TOUCH = 15; // 스크롤 방향 감지 임계값 (px) - 터치 기기
const FAST_SCROLL_THRESHOLD = 30; // 빠른 스크롤 감지 기준값 (px)
const FAST_SCROLL_MULTIPLIER = 5; // 빠른 스크롤 시 속도 증가 계수
const TOP_MARGIN = 5; // 페이지 최상단 인식 여백 (px)
const DIRECTION_CHANGE_MOMENTUM = 20; // 방향 전환 감지를 위한 누적 임계값 (px)

export function useHeaderScrollBehavior(headerHeight: number) {
  const [headerOffset, setHeaderOffset] = useState<number>(0);
  const prevScrollY = useRef<number>(0);
  const scrollingUp = useRef<boolean>(false);
  const lastFrameTime = useRef<number>(0);
  const isTouch = useRef<boolean>(false);
  const cumulativeScrollDelta = useRef<number>(0); // 누적 스크롤 변화량

  // 디바이스 타입 감지
  useEffect(() => {
    isTouch.current = "ontouchstart" in window;
  }, []);

  // 기기별 임계값 반환
  const getScrollThreshold = useCallback(() => {
    return isTouch.current ? SCROLL_THRESHOLD_TOUCH : SCROLL_THRESHOLD_DESKTOP;
  }, []);

  const updateHeaderPosition = useCallback(
    (currentScrollY: number) => {
      const scrollDelta = currentScrollY - prevScrollY.current;
      const threshold = getScrollThreshold();

      // 빠른 스크롤 감지
      const isFastScroll = Math.abs(scrollDelta) > FAST_SCROLL_THRESHOLD;

      // 누적 스크롤 델타 업데이트
      cumulativeScrollDelta.current += scrollDelta;

      // 스크롤 방향 감지 처리
      if (Math.abs(scrollDelta) > threshold) {
        // 큰 스크롤 변화 - 즉시 방향 업데이트
        scrollingUp.current = scrollDelta < 0;
        cumulativeScrollDelta.current = scrollDelta;
      } else if (
        (scrollingUp.current && scrollDelta > 0) ||
        (!scrollingUp.current && scrollDelta < 0)
      ) {
        // 현재 방향과 반대로 작은 스크롤 - 누적 처리
        if (
          Math.abs(cumulativeScrollDelta.current) > DIRECTION_CHANGE_MOMENTUM
        ) {
          scrollingUp.current = cumulativeScrollDelta.current < 0;
          cumulativeScrollDelta.current = 0;
        }
      }

      let newOffset = 0;

      // 페이지 최상단 처리
      if (currentScrollY <= TOP_MARGIN) {
        newOffset = 0;
      }
      // 헤더 높이보다 적게 스크롤된 경우
      else if (currentScrollY < headerHeight) {
        if (scrollingUp.current && headerOffset > -headerHeight) {
          // 위로 스크롤 - 헤더 점진적 표시
          const adjustedDelta = Math.abs(scrollDelta) * DAMPING_FACTOR;
          newOffset = Math.min(
            0,
            headerOffset + (scrollDelta < 0 ? adjustedDelta : -adjustedDelta)
          );
          newOffset = Math.max(-headerHeight, newOffset);
        } else {
          // 아래로 스크롤 또는 완전히 숨겨진 상태
          if (isFastScroll && !scrollingUp.current) {
            newOffset = -headerHeight; // 빠른 스크롤 시 즉시 숨김
          } else {
            newOffset = -currentScrollY; // 스크롤 위치에 비례하여 숨김
          }
        }
      }
      // 헤더 높이 이상 스크롤된 경우
      else {
        if (scrollingUp.current) {
          // 위로 스크롤 - 헤더 점진적 표시
          const maxSpeed = isTouch.current
            ? MAX_SPEED_TOUCH
            : MAX_SPEED_DESKTOP;
          const adjustedDelta = Math.min(
            Math.abs(scrollDelta) * DAMPING_FACTOR,
            maxSpeed
          );
          newOffset = Math.min(
            0,
            headerOffset + (scrollDelta < 0 ? adjustedDelta : -adjustedDelta)
          );
          newOffset = Math.max(-headerHeight, newOffset);
        } else {
          // 아래로 스크롤 - 헤더 숨김
          const speedMultiplier = isFastScroll ? FAST_SCROLL_MULTIPLIER : 1;
          const maxSpeed = isTouch.current
            ? MAX_SPEED_TOUCH * speedMultiplier
            : MAX_SPEED_DESKTOP * speedMultiplier;
          const adjustedDelta = Math.min(
            Math.abs(scrollDelta) * DAMPING_FACTOR,
            maxSpeed
          );
          newOffset = Math.max(-headerHeight, headerOffset - adjustedDelta);

          // 매우 빠른 스크롤 시 즉시 숨김
          if (
            isFastScroll &&
            Math.abs(scrollDelta) > FAST_SCROLL_THRESHOLD * 2
          ) {
            newOffset = -headerHeight;
          }
        }
      }

      setHeaderOffset(newOffset);
      prevScrollY.current = currentScrollY;
    },
    [headerHeight, headerOffset, getScrollThreshold]
  );

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      // 프레임 단위 제한으로 성능 최적화
      const now = Date.now();
      if (now - lastFrameTime.current < ANIMATION_FRAME_TIME) {
        return;
      }
      lastFrameTime.current = now;

      animationFrameId = requestAnimationFrame(() => {
        updateHeaderPosition(window.scrollY);
      });
    };

    // 초기 위치 설정
    updateHeaderPosition(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateHeaderPosition]);

  // 서브네비게이션 오프셋 계산
  const subNavOffset = headerOffset;

  return { headerOffset, subNavOffset };
}
