// 뉴스 상세 페이지 컴포넌트
// 뉴스 기사의 제목, 날짜, 메인 이미지, 본문 내용을 반응형 레이아웃으로 표시

import { Suspense } from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { News } from "@/lib/api/_types/news";
import { getNewsItem, getNews } from "@/lib/api/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import Loading from "./loading";
import { routing } from "@/i18n/routing";
import { PROSE_STYLES } from "@/constants/styles";
import { NewsNavigationButton } from "../_components/NewsNavigationButton";

export async function generateStaticParams() {
  const allPaths = [];

  for (const locale of routing.locales) {
    const newsItems = await getNews(locale);

    const paths = newsItems.map((newsItem) => ({
      locale,
      id: newsItem.id.toString(),
    }));

    allPaths.push(...paths);
  }

  return allPaths;
}

export const revalidate = 86400;

export default async function NewsDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await paramsPromise;
  const news: News = await getNewsItem(parseInt(id), locale);
  if (news.id === -1) {
    return (
      <EmptyState
        message="요청한 뉴스가 없습니다. 삭제되었거나 존재하지 않는 페이지입니다."
        actionLabel="뉴스 목록으로 돌아가기"
        actionHref={`/news`}
      />
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <Card className="overflow-hidden">
        {news.main_image && (
          <div className="relative w-full h-[40vh] min-h-[300px]">
            <Image
              src={news.main_image.file}
              alt={news.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{news.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(news.date).toLocaleDateString(locale)}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-4 sm:px-6">
          <div
            className={PROSE_STYLES.default}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(news.content || ""),
            }}
          />
        </CardContent>
      </Card>

      {/* 뉴스 목록으로 돌아가는 네비게이션 버튼 */}
      <NewsNavigationButton locale={locale} />
    </Suspense>
  );
}
