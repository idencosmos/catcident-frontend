// src/app/[locale]/about/books/loading.tsx
// 책 목록 페이지 로딩 상태 컴포넌트
// 실제 책 목록과 동일한 형태의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Grid from "@/components/common/Grid";

export default function Loading() {
  return (
    <Grid variant="spacious">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-full flex flex-col">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="flex justify-center mb-4">
              <Skeleton className="h-[240px] w-[180px] rounded-md" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="mt-auto">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
