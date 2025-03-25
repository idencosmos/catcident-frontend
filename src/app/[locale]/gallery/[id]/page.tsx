// filepath: src/app/[locale]/gallery/[id]/page.tsx
// 갤러리 상세 페이지를 렌더링합니다.
// 선택한 갤러리 아이템의 이미지와 상세 정보를 표시하고 이전 페이지로 돌아가는 기능을 제공합니다.

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGalleryItemDetail, getGalleryItems } from "@/lib/api/gallery";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import { Link } from "@/i18n/routing";
import Loading from "./loading";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const allPaths = [];

  for (const locale of routing.locales) {
    const galleryItems = await getGalleryItems(locale);

    const paths = galleryItems.map((item) => ({
      locale,
      id: item.id.toString(),
    }));

    allPaths.push(...paths);
  }

  return allPaths;
}

export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<{
    category?: string;
    from?: string;
  }>;
}

export default async function GalleryDetailPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const { locale, id } = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const galleryItem = await getGalleryItemDetail(parseInt(id), locale);

  if (galleryItem.id === -1) {
    notFound();
  }

  // 이전 페이지 네비게이션 정보 계산
  const { previousPath, buttonText } = getPreviousNavigation(
    searchParams,
    locale
  );

  // 현지화된 텍스트
  const t = {
    viewAllGalleries:
      locale === "ko" ? "모든 갤러리 보기" : "View all galleries",
    backToCategory:
      locale === "ko" ? "카테고리로 돌아가기" : "Back to category",
    backToPrevious: locale === "ko" ? "이전 페이지로" : "Back to previous page",
    featured: locale === "ko" ? "주요 작품" : "Featured",
    noYear: locale === "ko" ? "연도 미상" : "Unknown Year",
    galleryID: locale === "ko" ? "갤러리 ID" : "Gallery ID",
  };

  return (
    <Suspense fallback={<Loading />}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl">
                {galleryItem.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {galleryItem.year || t.noYear}
              </p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {galleryItem.category && (
                <Badge
                  variant="secondary"
                  className="font-normal text-sm bg-secondary/80 hover:bg-secondary/90"
                >
                  {galleryItem.category.name}
                </Badge>
              )}
              {galleryItem.is_featured && (
                <Badge
                  variant="outline"
                  className="bg-primary/5 border-primary/20"
                >
                  {t.featured}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {galleryItem.image && (
            <div className="relative w-full h-full flex justify-center">
              <Image
                src={galleryItem.image.file}
                alt={galleryItem.title}
                className="object-contain w-full h-auto max-h-[600px]"
                priority
                width={1280}
                height={720}
              />
            </div>
          )}

          <div className="space-y-6">
            <div className="px-1 py-3 border-l-4 border-primary/20 pl-4">
              <p className="text-lg font-medium leading-relaxed text-foreground/90">
                {galleryItem.short_description}
              </p>
            </div>

            <div
              className="prose prose-sm md:prose-base max-w-none text-foreground/80 prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/90 prose-img:rounded-md"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(galleryItem.description),
              }}
            />
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          <p>
            {t.galleryID}: {galleryItem.id}
          </p>
        </CardFooter>
      </Card>

      <div className="mt-4 flex justify-end">
        <Link href={previousPath}>
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>{buttonText}</span>
          </Button>
        </Link>
      </div>
    </Suspense>
  );
}

/**
 * 이전 페이지 네비게이션 정보를 계산하는 함수
 * 직접 접근, 카테고리 접근, 다른 페이지 접근 등의 경우를 처리합니다
 */
function getPreviousNavigation(
  searchParams: {
    category?: string;
    from?: string;
  },
  locale: string
): { previousPath: string; buttonText: string } {
  const t = {
    viewAllGalleries:
      locale === "ko" ? "모든 갤러리 보기" : "View all galleries",
    backToCategory:
      locale === "ko" ? "카테고리로 돌아가기" : "Back to category",
    backToPrevious: locale === "ko" ? "이전 페이지로" : "Back to previous page",
  };

  // 카테고리 파라미터가 있는 경우 (카테고리 페이지에서 접근한 경우)
  if (searchParams.category) {
    return {
      previousPath: `/gallery?category=${searchParams.category}`,
      buttonText: t.backToCategory,
    };
  }

  // from 파라미터가 있는 경우 (이전 경로가 명시적으로 지정된 경우)
  if (searchParams.from) {
    // from 파라미터가 gallery로 시작하면 갤러리 관련 페이지에서 온 것으로 판단
    if (searchParams.from.startsWith("/gallery")) {
      return {
        previousPath: searchParams.from,
        buttonText: t.viewAllGalleries,
      };
    }

    // 다른 페이지에서 온 경우
    return {
      previousPath: searchParams.from,
      buttonText: t.backToPrevious,
    };
  }

  // 기본적으로는 갤러리 목록 페이지로 이동 (직접 링크로 접근한 경우)
  return {
    previousPath: "/gallery",
    buttonText: t.viewAllGalleries,
  };
}
