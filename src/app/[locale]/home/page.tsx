// src/app/[locale]/home/page.tsx
import { Suspense } from "react";
import { HomeSection } from "@/lib/api/_types/home";
import { getHomeSections } from "@/lib/api/home";
import HeroSection from "./_sections/HeroSection";
import VideoSection from "./_sections/VideoSection";
import BooksSection from "./_sections/BooksSection";
import AuthorsSection from "./_sections/AuthorsSection";
import NewsSection from "./_sections/NewsSection";
import EventsSection from "./_sections/EventsSection";
import CustomSection from "./_sections/CustomSection";
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

export default async function HomePage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  const sections: HomeSection[] = await getHomeSections(locale);

  return (
    <>
      <HeroSection locale={locale} />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => {
            if (!section.is_active) return null;
            const layoutClass =
              section.layout === "full" ? "col-span-2" : "col-span-1";
            return (
              <div key={section.id} className={`${layoutClass} min-h-[400px]`}>
                <Suspense fallback={<HomePageSkeleton />}>
                  {section.type === "video" && (
                    <VideoSection content={section.content || ""} />
                  )}
                  {section.type === "books" && <BooksSection locale={locale} />}
                  {section.type === "authors" && (
                    <AuthorsSection locale={locale} />
                  )}
                  {section.type === "news" && <NewsSection locale={locale} />}
                  {section.type === "events" && (
                    <EventsSection locale={locale} />
                  )}
                  {section.type === "custom" && (
                    <CustomSection content={section.content || ""} />
                  )}
                </Suspense>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
