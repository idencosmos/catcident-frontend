// src/app/[locale]/about/creators/loading.tsx
// creators 페이지의 로딩 상태 컴포넌트
// 기본 로딩 상태를 표시합니다 (주로 redirect 전에 보여짐)

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-48 w-full" />
      </CardContent>
    </Card>
  );
}
