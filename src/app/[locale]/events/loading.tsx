// src/app/[locale]/events/loading.tsx
// 이벤트 페이지의 로딩 상태 컴포넌트
// 실제 이벤트 페이지와 동일한 탭과 목록 구조를 가진 스켈레톤 UI를 표시

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* 탭 UI 스켈레톤 */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-background"
          >
            리스트 뷰
          </TabsTrigger>
          <TabsTrigger value="calendar">캘린더 뷰</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-4">
            {[1, 2, 3].map((idx) => (
              <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                <CardHeader className="p-0 pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="hidden">
          {/* 캘린더 뷰는 리스트 뷰가 기본값이므로 숨겨둠 */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
