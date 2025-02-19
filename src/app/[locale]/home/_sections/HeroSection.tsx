"use client"; // 동영상/버튼 등 상호작용이 있으므로 client component

import { heroData } from "../_data/homeData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // shadcn/ui에는 card가 없을 수 있으므로 추가 제작 필요 (아래 참고)

export default function HeroSection() {
  const {
    title,
    subTitle,
    videoSrc,
    videoNotSupported,
    learnMoreButton,
  } = heroData;

  return (
    <Card className="p-6 shadow-md">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-full max-w-3xl my-4">
          <video className="w-full rounded-md shadow-lg" controls>
            <source src={videoSrc} type="video/mp4" />
            {videoNotSupported}
          </video>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-foreground">{title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{subTitle}</p>
        <Button variant="outline" size="lg">
          {learnMoreButton}
        </Button>
      </div>
    </Card>
  );
}