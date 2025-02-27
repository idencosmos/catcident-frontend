// src/app/[locale]/home/_sections/NewsSection.tsx
import { getLatestNews } from '@/lib/api/home';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { News } from '@/lib/api/_types/news';

interface NewsSectionProps {
  locale: string;
}

export default async function NewsSection({ locale }: NewsSectionProps) {
  const news: News[] = await getLatestNews(locale, 2);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl">최신 뉴스</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <Link key={item.id} href={`/${locale}/news/${item.id}`}>
              <div className="hover:shadow-lg transition-shadow p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.date).toLocaleDateString(locale)}
                </p>
                <p className="text-sm text-foreground line-clamp-2">
                  {item.content.replace(/<[^>]+>/g, '')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}