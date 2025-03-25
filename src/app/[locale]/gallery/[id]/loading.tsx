// src/app/[locale]/gallery/[id]/loading.tsx
// 갤러리 상세 페이지 로딩 상태를 표시합니다.
// 데이터 로딩 중 사용자에게 스켈레톤 UI를 제공합니다.

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/common/Container";

export default function Loading() {
  return (
    <Container>
      <div className="mb-4">
        <Skeleton className="h-9 w-36" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
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
          <Skeleton className="aspect-video max-h-[500px] w-full rounded-md" />

          <div className="space-y-6">
            <div className="py-3 pl-4 border-l-4 border-primary/20">
              <Skeleton className="h-6 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4">
          <Skeleton className="h-4 w-20" />
        </CardFooter>
      </Card>
    </Container>
  );
}
