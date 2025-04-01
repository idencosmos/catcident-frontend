// src/app/[locale]/gallery/loading.tsx
// 갤러리 페이지 로딩 상태를 표시합니다.
// 데이터 로딩 중 사용자에게 스켈레톤 UI를 제공합니다.

import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Grid from "@/components/common/Grid";

export default function Loading() {
  return (
    <Grid variant="spacious">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-1/4 mt-1" />
          </CardHeader>

          <div className="px-6 pb-0 pt-0 flex-1 flex flex-col">
            <Skeleton className="h-60 w-full mb-3 rounded-md" />
            <Skeleton className="h-5 w-20 mb-2" />
          </div>

          <CardFooter className="pt-0 pb-4">
            <div className="space-y-1.5 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </Grid>
  );
}
