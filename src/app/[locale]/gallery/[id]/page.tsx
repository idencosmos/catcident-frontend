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
import DOMPurify from "isomorphic-dompurify";
import Loading from "./loading";
import { routing } from "@/i18n/routing";
import { NavigationButton } from "../_components/NavigationButton";

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
}

export default async function GalleryDetailPage({
  params: paramsPromise,
}: PageProps) {
  const { locale, id } = await paramsPromise;

  const galleryItem = await getGalleryItemDetail(parseInt(id), locale);

  if (galleryItem.id === -1) {
    notFound();
  }

  // 현지화된 텍스트
  const t = {
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

      {/* 클라이언트 컴포넌트로 네비게이션 로직 분리 */}
      <NavigationButton locale={locale} />
    </Suspense>
  );
}
