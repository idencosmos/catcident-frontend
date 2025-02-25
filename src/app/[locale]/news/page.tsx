import { getNews } from "@/lib/api/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { News } from "@/lib/api/_types/news";
import { EmptyState } from "@/components/ui/empty-state";

export default async function NewsPage({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: { category?: string };
}) {
  const { locale } = await paramsPromise;
  const { category } = await searchParams;

  const news: News[] = await getNews(locale);
  const filteredNews = category ? news.filter(item => item.category?.slug === category) : news;

  if (filteredNews.length === 0) {
    return (
      <EmptyState
        message="이 카테고리에는 현재 뉴스가 없습니다."
        actionLabel="다른 카테고리 보기"
        actionHref={`/${locale}/news`}
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        {filteredNews.map((item) => (
          <Link key={item.id} href={`/${locale}/news/${item.id}`}>
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
      </div>
    </Suspense>
  );
}