"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import { HeroSlide } from "@/lib/api/_types/home";

interface HeroSectionClientProps {
  slides: HeroSlide[];
}

function CarouselIndicators({
  activeIndex,
  count,
}: {
  activeIndex: number;
  count: number;
}) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 z-10">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
            index === activeIndex
              ? "bg-white sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
              : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

export function HeroSectionClient({ slides }: HeroSectionClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
    })
  );

  const onSelect = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const validSlides = slides.filter((slide) => slide.image && slide.image.file);

  if (validSlides.length === 0) {
    return null;
  }

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {validSlides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="relative w-full aspect-[2/1]"
            >
              <Image
                src={slide.image.file}
                alt={slide.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselIndicators
          activeIndex={activeIndex}
          count={validSlides.length}
        />
      </Carousel>
    </>
  );
}
