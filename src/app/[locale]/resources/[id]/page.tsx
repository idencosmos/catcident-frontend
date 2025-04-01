// src/app/[locale]/resources/[id]/page.tsx
// 리소스 상세 페이지를 렌더링합니다.
// 선택한 리소스의 이미지, 상세 설명 및 다운로드 기능을 제공합니다.

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getResourceItem, getResources } from "@/lib/api/resources";
import { routing } from "@/i18n/routing";
import { PROSE_STYLES } from "@/constants/styles";
import Loading from "./loading";
import DownloadButton from "@/components/download/DownloadButton";
import { ResourceNavigationButton } from "../_components/ResourceNavigationButton";

// 빌드 시 정적 경로 생성: 모든 로케일과 리소스 ID 조합
export async function generateStaticParams() {
  const allPaths = [];

  for (const locale of routing.locales) {
    const resources = await getResources(locale);

    const paths = resources.map((resource) => ({
      locale,
      id: resource.id.toString(),
    }));

    allPaths.push(...paths);
  }

  return allPaths;
}

// 페이지 재검증 주기 설정 (초 단위, 24시간)
export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function ResourceDetailPage({
  params: paramsPromise,
}: PageProps) {
  const { locale, id } = await paramsPromise;

  // 리소스 상세 정보 가져오기
  const resource = await getResourceItem(parseInt(id), locale);

  // 리소스를 찾을 수 없으면 404 페이지 표시
  if (resource.id === -1) {
    notFound();
  }

  // 현지화된 텍스트
  const t = {
    resourceID: locale === "ko" ? "리소스 ID" : "Resource ID",
    category: locale === "ko" ? "카테고리" : "Category",
    download: locale === "ko" ? "다운로드" : "Download",
    noFile: locale === "ko" ? "다운로드 파일 없음" : "No downloadable file",
  };

  return (
    <Suspense fallback={<Loading />}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl">
                {resource.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(resource.created_at).toLocaleDateString(locale)}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {resource.category && (
                <Badge
                  variant="secondary"
                  className="font-normal text-sm bg-secondary/80 hover:bg-secondary/90"
                >
                  {resource.category.name}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* 리소스 이미지 표시 */}
          {resource.main_image && (
            <div className="relative w-full h-full flex justify-center">
              <Image
                src={resource.main_image.file}
                alt={resource.title}
                className="object-contain w-full h-auto max-h-[600px] rounded-lg"
                priority
                width={1280}
                height={720}
              />
            </div>
          )}

          {/* 다운로드 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {resource.file ? (
              <DownloadButton
                fileUrl={resource.file.file}
                fileName={resource.title}
                buttonText={t.download}
              />
            ) : (
              <Button disabled>{t.noFile}</Button>
            )}
          </div>

          {/* 상세 설명 (HTML) 표시 - DOMPurify로 XSS 방지 */}
          <div
            className={PROSE_STYLES.ckeditor}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(resource.description || ""),
            }}
          />
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          <div className="flex flex-col gap-1">
            <p>
              {t.resourceID}: {resource.id}
            </p>
            {resource.category && (
              <p>
                {t.category}: {resource.category.name}
              </p>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* 이전 페이지로 돌아가는 네비게이션 버튼 */}
      <ResourceNavigationButton locale={locale} />
    </Suspense>
  );
}
