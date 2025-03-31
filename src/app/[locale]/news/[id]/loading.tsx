// src/app/[locale]/news/[id]/loading.tsx
// 뉴스 상세 페이지의 로딩 상태 컴포넌트
// 실제 뉴스 상세 페이지와 동일한 구조의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <>
      <Card className="overflow-hidden">
        {/* 메인 이미지 영역 */}
        <Skeleton className="w-full h-[40vh] min-h-[300px]" />

        <CardHeader>
          {/* 제목 */}
          <Skeleton className="h-8 w-3/4 mb-2" />
          {/* 날짜 */}
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>

        <CardContent className="space-y-6 px-4 sm:px-6">
          {/* 본문 내용 */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        </CardContent>
      </Card>

      {/* 네비게이션 버튼 스켈레톤 */}
      <div className="mt-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </>
  );
}
