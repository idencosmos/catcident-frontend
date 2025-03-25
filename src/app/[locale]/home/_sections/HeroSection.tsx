// src/app/[locale]/home/_sections/HeroSection.tsx
// 홈페이지 상단에 표시될 히어로 섹션 서버 컴포넌트 - API에서 슬라이드 데이터를 가져와 클라이언트 컴포넌트로 전달
import { getHeroSlides } from "@/lib/api/home";
import { HeroSlide } from "@/lib/api/_types/home";
import { HeroSectionClient } from "./HeroSectionClient";

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  // API에서 히어로 슬라이드 데이터 가져오기
  const slides: HeroSlide[] = await getHeroSlides(locale);

  // 유효한 슬라이드가 없으면 렌더링하지 않음
  if (!slides || slides.length === 0) {
    return null;
  }

  return <HeroSectionClient slides={slides} />;
}
