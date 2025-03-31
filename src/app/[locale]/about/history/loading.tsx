// src/app/[locale]/about/history/loading.tsx
// 히스토리 페이지의 로딩 상태 컴포넌트
// 실제 히스토리 페이지와 동일한 카드 형태의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* 날짜 영역 - 카드 헤더 */}
            <CardHeader className="w-full md:w-1/4 p-4 sm:p-6 md:p-8 bg-muted/20">
              <Skeleton className="h-7 w-32" />
            </CardHeader>

            {/* 내용 영역 - 카드 콘텐츠 */}
            <CardContent className="w-full md:w-3/4 p-4 sm:p-6 md:p-8 space-y-3">
              {/* 이미지 (일부 카드에만 있을 수 있음) */}
              <div className="mb-4">
                <Skeleton className="h-40 w-[300px] rounded-md" />
              </div>

              {/* 제목 */}
              <Skeleton className="h-7 w-3/4" />

              {/* 설명 내용 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
