// src/app/[locale]/news/page.tsx
// 뉴스 기사 목록을 보여주는 페이지로, 카테고리별 필터링을 지원합니다.

import { Suspense } from "react";
import Image from "next/image";
import { stripHtml } from "string-strip-html";

import { Link } from "@/i18n/routing";
import { News } from "@/lib/api/_types/news";
import { getNews } from "@/lib/api/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";
import Grid from "@/components/common/Grid";
import Loading from "./loading";

export default async function NewsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await paramsPromise;
  const { category } = await searchParamsPromise;

  const news: News[] = await getNews(locale);
  const filteredNews = category
    ? news.filter((item) => item.category?.slug === category)
    : news;

  if (filteredNews.length === 0) {
    return (
      <EmptyState
        message="이 카테고리에는 현재 뉴스가 없습니다."
        actionLabel="다른 카테고리 보기"
        actionHref={`/news`}
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Grid variant="list">
        {filteredNews.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="block w-full"
          >
            <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full">
              <div className="flex flex-col sm:flex-row h-full">
                {item.main_image && (
                  <div className="sm:w-1/4 min-w-[200px]">
                    <div className="relative h-48 sm:h-full">
                      <Image
                        src={item.main_image.file}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={`flex-1 flex flex-col ${
                    item.main_image ? "" : "w-full"
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {new Date(item.date).toLocaleDateString(locale)}
                      </p>
                    </div>
                    {item.category && (
                      <Badge
                        variant="secondary"
                        className="font-normal text-xs bg-secondary/80 hover:bg-secondary/90 mt-2"
                      >
                        {item.category.name}
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-foreground line-clamp-3">
                      {item.content
                        ? stripHtml(item.content).result
                        : "No content available."}
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </Suspense>
  );
}
