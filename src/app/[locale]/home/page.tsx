// src/app/[locale]/home/page.tsx
// 홈페이지 레이아웃 - Adobe 스타일 참고하여 균형 잡힌 그리드 레이아웃 구현
import { Suspense } from "react";
import { HomeSection } from "@/lib/api/_types/home";
import { getHomeSections } from "@/lib/api/home";
import HeroSection from "./_sections/HeroSection";
import BooksSection from "./_sections/BooksSection";
import AuthorsSection from "./_sections/AuthorsSection";
import NewsSection from "./_sections/NewsSection";
import EventsSection from "./_sections/EventsSection";
import CustomSection from "./_sections/CustomSection";
import { Skeleton } from "@/components/ui/skeleton";
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

  // 섹션을 행으로 그룹화 (full width 섹션은 별도 행)
  const groupedSections = sections.reduce((groups, section) => {
    if (!section.is_active) return groups;
    
    if (section.layout === "full") {
      // full width 섹션은 별도의 행으로 처리
      groups.push([section]);
    } else {
      // 마지막 행이 비어있거나 2개 미만의 항목이 있으면 추가
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup || lastGroup.length >= 2 || lastGroup[0]?.layout === "full") {
        groups.push([section]);
      } else {
        lastGroup.push(section);
      }
    }
    
    return groups;
  }, [] as HomeSection[][]);

  return (
    <>
      <HeroSection locale={locale} />
      <Container>
        <div className="space-y-6">
          {groupedSections.map((row, rowIndex) => (
            <Grid key={`row-${rowIndex}`} variant="home" className="grid-flow-row auto-rows-fr">
              {row.map((section) => {
                const layoutClass = 
                  section.layout === "full" ? "md:col-span-2" : "md:col-span-1";
                
                return (
                  <Card
                    key={section.id}
                    className={`col-span-1 ${layoutClass} overflow-hidden h-full`}
                  >
                    <CardContent className="p-4 sm:p-5 md:p-6 h-full flex flex-col">
                      <Suspense fallback={<HomePageSkeleton />}>
                        {section.type === "books" && (
                          <BooksSection locale={locale} />
                        )}
                        {section.type === "authors" && (
                          <AuthorsSection locale={locale} />
                        )}
                        {section.type === "news" && (
                          <NewsSection locale={locale} />
                        )}
                        {section.type === "events" && (
                          <EventsSection locale={locale} />
                        )}
                        {section.type === "custom" && (
                          <CustomSection content={section.content || ""} />
                        )}
                      </Suspense>
                    </CardContent>
                  </Card>
                );
              })}
            </Grid>
          ))}
        </div>
      </Container>
    </>
  );
}