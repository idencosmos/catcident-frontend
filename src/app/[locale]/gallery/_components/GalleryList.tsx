// src/app/[locale]/gallery/_components/GalleryList.tsx
// 갤러리 아이템을 서버 컴포넌트로 표시합니다.
// 이미지 그리드 레이아웃과 다국어 지원 기능을 제공합니다.

import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Grid from "@/components/common/Grid";
import { GalleryItem } from "@/lib/api/_types/gallery";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface GalleryListProps {
  items: GalleryItem[];
  locale: string;
  currentCategory?: string;
}

export function GalleryList({
  items,
  locale,
  currentCategory,
}: GalleryListProps) {
  // 텍스트 현지화
  const t = {
    featured: locale === "ko" ? "주요 작품" : "Featured",
    noYear: locale === "ko" ? "연도 미상" : "Unknown Year",
  };

  return (
    <Grid variant="spacious">
      {items.map((item) => (
        <Link
          key={item.id}
          href={
            currentCategory
              ? `/gallery/${item.id}?category=${currentCategory}`
              : `/gallery/${item.id}`
          }
        >
          <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl line-clamp-1">
                  {item.title}
                </CardTitle>
                {item.is_featured && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 whitespace-nowrap"
                  >
                    {t.featured}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground h-5">
                {item.year || t.noYear}
              </p>
            </CardHeader>

            {/* 이미지 컨테이너: 패딩과 비율 설정이 포함된 단일 div */}
            <div className="px-6 pb-2 pt-0 flex-1 relative w-full sm:aspect-[4/3] overflow-hidden flex items-center justify-center">
              {item.image && (
                <Image
                  src={item.image.file}
                  alt={item.title}
                  width={600}
                  height={450}
                  className="object-contain w-full h-full"
                />
              )}
            </div>

            {/* 카테고리 배지 - 이미지 아래, 설명 위에 배치 */}
            <div className="px-6 pb-2">
              {item.category && (
                <Badge
                  variant="secondary"
                  className="font-normal text-xs bg-secondary/80 hover:bg-secondary/90"
                >
                  {item.category.name}
                </Badge>
              )}
            </div>

            <CardFooter className="pt-0 pb-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.short_description}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}
