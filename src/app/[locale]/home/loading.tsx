// src/app/[locale]/home/loading.tsx
// 홈 페이지의 로딩 상태 컴포넌트
// 실제 홈 페이지와 동일한 구조의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";

// 히어로 섹션 스켈레톤
function HeroSectionSkeleton() {
  return (
    <div className="w-full relative">
      <Skeleton className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-none" />
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" />
        ))}
      </div>
    </div>
  );
}

// 개별 섹션 스켈레톤
function SectionSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        <Skeleton className="h-[180px] w-[140px] md:w-[160px] rounded-md" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="pt-3">
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <HeroSectionSkeleton />
      <Container>
        <div className="space-y-4 sm:space-y-6 md:space-y-8 py-6">
          {/* 첫 번째 행: 2개 섹션 (기본 레이아웃) */}
          <Grid variant="home" className="grid-flow-row auto-rows-fr">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="col-span-1 md:col-span-1 overflow-hidden h-full">
                <CardContent className="p-4 sm:p-5 md:p-6 h-full flex flex-col">
                  <SectionSkeleton />
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* 두 번째 행: 1개 섹션 (전체 너비) */}
          <Grid variant="home" className="grid-flow-row auto-rows-fr">
            <Card className="col-span-1 md:col-span-2 overflow-hidden h-full">
              <CardContent className="p-4 sm:p-5 md:p-6 h-full flex flex-col">
                <SectionSkeleton />
              </CardContent>
            </Card>
          </Grid>
        </div>
      </Container>
    </>
  );
}