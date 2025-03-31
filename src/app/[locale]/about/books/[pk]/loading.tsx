// src/app/[locale]/about/books/[pk]/loading.tsx
// 책 상세 페이지 로딩 상태 컴포넌트
// 실제 책 상세 페이지와 동일한 형태의 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* 모바일: 사진(좌) + 이름(우) 배치, 데스크톱: 사진/이름(좌) + 상세설명(우) */}
        <div className="md:col-span-1">
          {/* 모바일: 좌우 배치, 데스크톱: 수직 배치 */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-2">
            {/* 사진: 모바일에서 왼쪽 1칸, 데스크톱에서 세로로 배치 */}
            <div className="col-span-1 md:col-span-full flex justify-start items-start w-full">
              <div className="w-full overflow-hidden rounded-md">
                <Skeleton className="w-full h-[300px] md:h-[400px] rounded-lg" />
              </div>
            </div>

            {/* 이름 및 간략 정보: 모바일에서 오른쪽 2칸, 데스크톱에서 세로로 배치 */}
            <div className="col-span-2 md:col-span-full flex flex-col justify-center md:justify-start md:mt-3">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="space-y-2 mt-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </div>

        {/* 상세 설명: 모바일과 데스크톱 모두 하단/우측에 배치 */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 네비게이션 버튼 영역 */}
      <div className="pt-4">
        <Skeleton className="h-10 w-40" />
      </div>
    </>
  );
}
