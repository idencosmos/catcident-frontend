// src/app/[locale]/home/page.tsx (container 추가)
import HeroSection from "./_sections/HeroSection";
import HighlightBook from "./_sections/HighlightBook";
import AboutAndAuthor from "./_sections/AboutAndAuthor";
import NewsEvents from "./_sections/NewsEvents";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function HomePageSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-8">
        <Suspense fallback={<HomePageSkeleton />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<HomePageSkeleton />}>
          <HighlightBook />
        </Suspense>
        <Suspense fallback={<HomePageSkeleton />}>
          <AboutAndAuthor />
        </Suspense>
        <Suspense fallback={<HomePageSkeleton />}>
          <NewsEvents />
        </Suspense>
      </div>
    </div>
  );
}