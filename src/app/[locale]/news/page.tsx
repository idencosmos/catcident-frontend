import { Suspense } from "react";

import Image from "next/image";

import { Link } from "@/i18n/routing";
import { News } from "@/lib/api/_types/news";
import { getNews } from "@/lib/api/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
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
  const filteredNews = category ? news.filter(item => item.category?.slug === category) : news;

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
        {filteredNews.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.date).toLocaleDateString(locale)}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-4">
                {item.main_image && (
                  <Image
                    src={item.main_image.file}
                    alt={item.title}
                    width={200}
                    height={150}
                    className="rounded-md"
                  />
                )}
                <p className="text-foreground line-clamp-3">{item.content.replace(/<[^>]+>/g, '')}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
    </Suspense>
  );
}