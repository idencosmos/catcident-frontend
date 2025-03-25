// src/app/[locale]/home/_sections/NewsSection.tsx
// 홈페이지에 표시될 최신 뉴스 섹션 컴포넌트 - 최신 뉴스를 시각적으로 효과적으로 표시
import { stripHtml } from "string-strip-html";
import { News } from "@/lib/api/_types/news";
import { getLatestNews } from "@/lib/api/home";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

interface NewsSectionProps {
  locale: string;
}

export default async function NewsSection({ locale }: NewsSectionProps) {
  const news: News[] = await getLatestNews(locale, 2);

  // 다국어 텍스트 설정
  const latestNewsTitle = locale === "ko" ? "최신 뉴스" : "Latest News";
  const readMoreText = locale === "ko" ? "더 읽기" : "Read More";
  const noContentText =
    locale === "ko" ? "내용이 없습니다." : "No content available.";

  return (
    <div className="h-full flex flex-col">
      <CardTitle className="text-2xl mb-4 md:mb-6">{latestNewsTitle}</CardTitle>

      <div className="flex-1 flex flex-col space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col border rounded-lg overflow-hidden transition-all hover:shadow-md"
          >
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                <time dateTime={item.date}>
                  {new Date(item.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              <p className="text-sm text-foreground/90 mt-2 flex-1 line-clamp-3">
                {item.content ? stripHtml(item.content).result : noContentText}
              </p>

              <div className="mt-3">
                <Link href={`/news/${item.id}`} passHref>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-0 text-primary hover:text-primary/90 hover:bg-transparent"
                  >
                    {readMoreText} →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
