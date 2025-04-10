// src/app/[locale]/about/creators/[slug]/page.tsx
// 창작자 상세 정보 페이지 컴포넌트
// 개별 창작자의 프로필, 정보, 작품 활동 등을 보여줍니다.

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCreator, getCreators } from "@/lib/api/about";
import { Creator } from "@/lib/api/_types/about/creator";
import { Card, CardContent } from "@/components/ui/card";
import { routing } from "@/i18n/routing";
import Loading from "./loading";
import DOMPurify from "isomorphic-dompurify";
import { PROSE_STYLES } from "@/constants/styles";

export async function generateStaticParams() {
  const allPaths = [];

  for (const locale of routing.locales) {
    const creators = await getCreators(locale);

    const paths = creators.map((creator) => ({
      locale,
      slug: creator.slug,
    }));

    allPaths.push(...paths);
  }

  return allPaths;
}

export const revalidate = 86400;

export default async function CreatorSlugPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await paramsPromise;
  const creator: Creator = await getCreator(slug, locale);

  if (creator.id === -1) {
    notFound();
  }

  // 다국어 텍스트 설정
  const noImageText = locale === "ko" ? "이미지 없음" : "No Image";

  return (
    <Suspense fallback={<Loading />}>
      {/* 모바일: 사진(좌) + 이름/소개(우) 배치, 데스크톱: 사진/이름/소개(좌) + 상세설명(우) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* 모바일에서는 한 줄로 배치, 데스크톱에서는 첫번째 컬럼으로 배치 */}
        <div className="md:col-span-1">
          {/* 모바일: 좌우 배치, 데스크톱: 수직 배치 */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-2">
            {/* 사진: 모바일에서 왼쪽 1칸, 데스크톱에서 세로로 배치 */}
            <div className="col-span-1 md:col-span-full flex justify-start items-start w-full">
              {creator.photo ? (
                <div className="relative w-full overflow-hidden rounded-md">
                  <Image
                    src={creator.photo.file}
                    alt={`${creator.name}`}
                    width={500}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                    className="object-contain rounded-lg shadow-md"
                    sizes="(max-width: 768px) 33vw, 25vw"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    {noImageText}
                  </span>
                </div>
              )}
            </div>

            {/* 이름 및 간략 소개: 모바일에서 오른쪽 2칸, 데스크톱에서 세로로 배치 */}
            <div className="col-span-2 md:col-span-full flex flex-col justify-center md:justify-start md:mt-3">
              <h1 className="text-xl md:text-2xl font-semibold">
                {creator.name}
              </h1>

              {creator.bio_summary && (
                <p className="text-sm text-muted-foreground mt-2">
                  {creator.bio_summary}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 상세 설명: 모바일과 데스크톱 모두 하단/우측에 배치 */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div
                className={PROSE_STYLES.ckeditor}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(creator.description || ""),
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  );
}
