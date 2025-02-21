'use client';

import { useState, useEffect, useRef } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useHeaderScrollBehavior(headerHeight: number, subNavHeight: number) {
  const [headerOffset, setHeaderOffset] = useState(0);
  const [subNavOffset, setSubNavOffset] = useState(0);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDelta = prevScrollY.current - currentScrollY; // 양수: 스크롤 업, 음수: 스크롤 다운
      let newHeaderOffset = headerOffset;

      if (currentScrollY <= headerHeight) {
        // 스크롤이 headerHeight 이하일 때: 헤더가 점진적으로 사라짐
        newHeaderOffset = -currentScrollY;
      } else {
        if (prevScrollY.current <= headerHeight) {
          // 전환 지점: 스크롤이 headerHeight를 넘으면 헤더 완전히 숨김
          newHeaderOffset = -headerHeight;
        } else {
          // 스크롤 방향에 따라 헤더 오프셋 조정
          if (scrollingDelta > 0) {
            // 스크롤 업: 헤더를 점진적으로 나타냄
            newHeaderOffset = clamp(headerOffset + scrollingDelta, -headerHeight, 0);
          } else if (scrollingDelta < 0) {
            // 스크롤 다운: 헤더를 점진적으로 숨김
            newHeaderOffset = clamp(headerOffset + scrollingDelta, -headerHeight, 0);
          }
        }
      }

      // SubNavBar 오프셋 동기화
      const newSubNavOffset = newHeaderOffset >= -headerHeight ? newHeaderOffset : -headerHeight;

      setHeaderOffset(newHeaderOffset);
      setSubNavOffset(newSubNavOffset);
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight, subNavHeight, headerOffset]);

  return { headerOffset, subNavOffset };
}