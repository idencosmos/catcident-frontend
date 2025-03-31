// src/app/[locale]/resources/page.tsx
// 리소스 목록 페이지를 렌더링합니다.
// 리소스 카테고리별 필터링 및 리소스 카드 목록을 표시합니다.

import { Suspense } from "react";
import Image from "next/image";
import { stripHtml } from "string-strip-html";

import { Link } from "@/i18n/routing";
import { Resource } from "@/lib/api/_types/resource";
import { getResources } from "@/lib/api/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import Grid from "@/components/common/Grid";
import Loading from "./loading";
import { Badge } from "@/components/ui/badge";

export default async function ResourcesPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await paramsPromise;
  const { category } = await searchParamsPromise;

  // 현지화된 텍스트
  const t = {
    noResources:
      locale === "ko"
        ? "이 카테고리에는 현재 리소스가 없습니다."
        : "No resources available in this category.",
    viewOtherCategories:
      locale === "ko" ? "다른 카테고리 보기" : "View other categories",
    viewDetails: locale === "ko" ? "상세 보기" : "View Details",
    noDescription: locale === "ko" ? "설명 없음" : "No description available.",
  };

  const resources: Resource[] = await getResources(locale);
  const filteredResources = category
    ? resources.filter((resource) => resource.category?.slug === category)
    : resources;

  if (filteredResources.length === 0) {
    return (
      <EmptyState
        message={t.noResources}
        actionLabel={t.viewOtherCategories}
        actionHref={`/resources`}
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Grid variant="spacious">
        {filteredResources.map((resource) => (
          <Card
            key={resource.id}
            className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow group"
          >
            <Link
              href={
                category
                  ? `/resources/${resource.id}?category=${category}`
                  : `/resources/${resource.id}`
              }
              className="flex-grow flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  {resource.category && (
                    <Badge variant="secondary" className="font-normal text-sm">
                      {resource.category.name}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(resource.created_at).toLocaleDateString(locale)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                {resource.main_image && (
                  <div className="w-full overflow-hidden rounded-md aspect-video">
                    <Image
                      src={resource.main_image.file}
                      alt={resource.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <p className="text-sm line-clamp-2">
                  {resource.description
                    ? stripHtml(resource.description).result
                    : t.noDescription}
                </p>
                <div className="flex mt-auto pt-4">
                  <Button variant="outline" className="w-full">
                    {t.viewDetails}
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Grid>
    </Suspense>
  );
}
