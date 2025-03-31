// src/app/[locale]/gallery/[id]/loading.tsx
// 갤러리 상세 페이지의 로딩 상태 컴포넌트
// 실제 갤러리 상세 페이지와 동일한 구조의 스켈레톤 UI를 표시

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <Skeleton className="h-9 w-72" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex gap-2 items-center">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* 갤러리 이미지 스켈레톤 */}
          <div className="relative w-full h-full flex justify-center">
            <Skeleton className="w-full aspect-video max-h-[600px] rounded-md" />
          </div>

          <div className="space-y-6">
            {/* 짧은 설명 스켈레톤 */}
            <div className="px-1 py-3 border-l-4 border-primary/20 pl-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5 mt-2" />
            </div>

            {/* 상세 설명 스켈레톤 */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          <Skeleton className="h-4 w-28" />
        </CardFooter>
      </Card>

      {/* 뒤로가기 버튼 스켈레톤 */}
      <div className="mt-4">
        <Skeleton className="h-10 w-28" />
      </div>
    </>
  );
}
