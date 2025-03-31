// src/app/[locale]/resources/loading.tsx
// 리소스 목록 페이지의 로딩 상태를 표시하는 컴포넌트입니다.
// 로딩 중에 스켈레톤 카드를 표시합니다.

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Grid from "@/components/common/Grid";

export default function Loading() {
  return (
    <Grid variant="spacious">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-auto pt-4">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
