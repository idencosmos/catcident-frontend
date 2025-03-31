// src/app/[locale]/about/characters/loading.tsx
// 캐릭터 목록 페이지 로딩 상태 컴포넌트
// 실제 캐릭터 목록과 동일한 형태의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

            <div className="mt-auto space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
