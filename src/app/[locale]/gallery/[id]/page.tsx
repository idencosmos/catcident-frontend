// filepath: src/app/[locale]/gallery/[id]/page.tsx
// 갤러리 상세 페이지를 렌더링합니다.
// 선택한 갤러리 아이템의 이미지와 상세 정보를 표시합니다.

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getGalleryItemDetail } from "@/lib/api/gallery";
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
import Container from "@/components/common/Container";
import DOMPurify from "isomorphic-dompurify";
import { Link } from "@/i18n/routing";
import Loading from "./loading";

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
  setRequestLocale(locale);

  const galleryItem = await getGalleryItemDetail(parseInt(id), locale);

  if (galleryItem.id === -1) {
    notFound();
  }

  // 현지화된 텍스트
  const t = {
    viewAllGalleries:
      locale === "ko" ? "모든 갤러리 보기" : "View all galleries",
    featured: locale === "ko" ? "주요 작품" : "Featured",
    noYear: locale === "ko" ? "연도 미상" : "Unknown Year",
    galleryID: locale === "ko" ? "갤러리 ID" : "Gallery ID",
  };

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <div className="mb-4">
          <Link href="/gallery">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>{t.viewAllGalleries}</span>
            </Button>
          </Link>
        </div>

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
      </Suspense>
    </Container>
  );
}
