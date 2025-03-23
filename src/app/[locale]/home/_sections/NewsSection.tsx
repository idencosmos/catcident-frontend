// src/app/[locale]/home/_sections/NewsSection.tsx
import Link from 'next/link';
import { stripHtml } from "string-strip-html";
import { News } from '@/lib/api/_types/news';
import { getLatestNews } from '@/lib/api/home';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface NewsSectionProps {
  locale: string;
}

export default async function NewsSection({ locale }: NewsSectionProps) {
  const news: News[] = await getLatestNews(locale, 2);
  
  return (
    <>
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">최신 뉴스</CardTitle>
      </CardHeader>
      <div className="mt-4">
        <div className="space-y-4">
          {news.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <div className="hover:shadow-lg transition-shadow p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.date).toLocaleDateString(locale)}
                </p>
                <p className="text-sm text-foreground line-clamp-2">
                  {item.content ? stripHtml(item.content).result : "No content available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}