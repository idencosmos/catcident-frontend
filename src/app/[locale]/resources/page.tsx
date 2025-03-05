import { getResources } from "@/lib/api/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Loading from "./loading";
import { Resource } from "@/lib/api/_types/resource";
import { EmptyState } from "@/components/ui/empty-state";

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
        actionHref={`/${locale}/resources`}
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
    </Suspense>
  );
}