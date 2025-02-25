"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import { HeroSlide } from "@/lib/api/_types/home";

interface HeroSectionClientProps {
  slides: HeroSlide[];
}

export function HeroSectionClient({ slides }: HeroSectionClientProps) {
  const plugin = useRef(Autoplay({ delay: 3000 }));

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="relative w-full aspect-[2/1]"
            >
              <Image
                src={slide.image.file}
                alt={slide.title}
                fill
                sizes="100vw" // 다양한 화면 크기에 맞춰 적절한 이미지 크기 제공
                style={{ objectFit: "cover" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
