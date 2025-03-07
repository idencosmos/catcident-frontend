"use client";

import { useState, useEffect, useRef } from "react";

export function useHeaderScrollBehavior(headerHeight: number) {
  const [headerOffset, setHeaderOffset] = useState<number>(0);
  const prevScrollY = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = prevScrollY.current - currentScrollY;
        if (delta !== 0) {
          let newOffset = headerOffset + delta;
          newOffset = Math.min(0, Math.max(-headerHeight, newOffset));

          setHeaderOffset(newOffset);
          prevScrollY.current = currentScrollY;
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [headerHeight, headerOffset]);

  const subNavOffset =
    headerOffset <= -headerHeight ? -headerHeight : headerOffset;

  return { headerOffset, subNavOffset };
}
