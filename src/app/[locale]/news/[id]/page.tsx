import { Suspense } from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { News } from "@/lib/api/_types/news";
import { getNewsItem, getNews } from "@/lib/api/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import Loading from "../loading";
import { routing } from "@/i18n/routing";

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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{news.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(news.date).toLocaleDateString(locale)}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {news.main_image && (
            <Image
              src={news.main_image.file}
              alt={news.title}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          )}
          <div
            className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.content || "") }}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
