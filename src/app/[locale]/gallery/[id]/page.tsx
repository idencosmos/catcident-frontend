// src/app/[locale]/gallery/[id]/page.tsx
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
import { PROSE_STYLES } from "@/constants/styles";

// 빌드 시 정적 경로 생성: 모든 로케일과 갤러리 아이템 ID 조합
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

// 페이지 재검증 주기 설정 (초 단위, 예: 24시간)
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

  // 갤러리 아이템 상세 정보 가져오기
  const galleryItem = await getGalleryItemDetail(parseInt(id), locale);

  // 아이템을 찾을 수 없으면 404 페이지 표시
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
          {/* 갤러리 이미지 표시 */}
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
            {/* 짧은 설명 표시 */}
            <div className="px-1 py-3 border-l-4 border-primary/20 pl-4">
              <p className="text-lg font-medium leading-relaxed text-foreground/90">
                {galleryItem.short_description}
              </p>
            </div>

            {/* 상세 설명 (HTML) 표시 - DOMPurify로 XSS 방지 */}
            <div
              className={PROSE_STYLES.ckeditor}
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

      {/* 뒤로가기 버튼 (클라이언트 컴포넌트) */}
      <NavigationButton locale={locale} />
    </Suspense>
  );
}
