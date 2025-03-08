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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";

function HomePageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
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
    <Container>
      <HeroSection locale={locale} />
      <Grid variant="home">
        {sections.map((section) => {
          if (!section.is_active) return null;

          const layoutClass =
            section.layout === "full" ? "md:col-span-2" : "md:col-span-1";

          return (
            <Card
              key={section.id}
              className={`col-span-1 ${layoutClass} overflow-hidden`}
            >
              <CardContent className="h-[300px] sm:h-[350px] md:h-[400px] p-4 sm:p-8">
                <ScrollArea className="h-full w-full">
                  <Suspense fallback={<HomePageSkeleton />}>
                    {section.type === "video" && (
                      <VideoSection content={section.content || ""} />
                    )}
                    {section.type === "books" && (
                      <BooksSection locale={locale} />
                    )}
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
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
