import { Suspense } from "react";

import Image from "next/image";

import { Link } from "@/i18n/routing";
import { Resource } from "@/lib/api/_types/resource";
import { getResources } from "@/lib/api/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import Grid from "@/components/common/Grid";
import Loading from "./loading";

export default async function ResourcesPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await paramsPromise;
  const { category } = await searchParamsPromise;

  const resources: Resource[] = await getResources(locale);
  const filteredResources = category
    ? resources.filter((resource) => resource.category?.slug === category)
    : resources;

  if (filteredResources.length === 0) {
    return (
      <EmptyState
        message="이 카테고리에는 현재 리소스가 없습니다."
        actionLabel="다른 카테고리 보기"
        actionHref={`/resources`}
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Grid variant="spacious">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(resource.created_at).toLocaleDateString(locale)}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {resource.main_image && (
                <Image
                  src={resource.main_image.file}
                  alt={resource.title}
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              )}
              <p className="text-sm line-clamp-2">
                {resource.description.replace(/<[^>]+>/g, "")}
              </p>
              {resource.file ? (
                <Link href={resource.file.file} target="_blank">
                  <Button variant="outline">Download</Button>
                </Link>
              ) : (
                <Button variant="outline" disabled>No File Available</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Suspense>
  );
}