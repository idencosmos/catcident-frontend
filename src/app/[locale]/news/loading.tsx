// src/app/[locale]/news/loading.tsx
// 뉴스 페이지의 로딩 상태 컴포넌트
// 실제 뉴스 목록 페이지와 동일한 구조의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Grid from "@/components/common/Grid";

// 개별 뉴스 카드 스켈레톤
function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-1/4 min-w-[200px]">
          <Skeleton className="h-48 sm:h-full" />
        </div>

        <div className="flex-1 flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-20 ml-4" />
            </div>
            <Skeleton className="h-5 w-20 mt-2" />
          </CardHeader>

          <CardContent className="flex-1">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default function Loading() {
  return (
    <Grid variant="list">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-full">
          <NewsCardSkeleton />
        </div>
      ))}
    </Grid>
  );
}
