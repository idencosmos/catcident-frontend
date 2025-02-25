import { getHeroSlides } from "@/lib/api/home";
import { HeroSlide } from "@/lib/api/_types/home";
import { HeroSectionClient } from "./HeroSectionClient";

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const slides: HeroSlide[] = await getHeroSlides(locale);
  return (
      <div className="w-full">
        <HeroSectionClient slides={slides} />
      </div>
  );
}
