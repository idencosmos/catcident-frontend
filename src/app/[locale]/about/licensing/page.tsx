import { Suspense } from "react";
import { getLicensePage } from "@/lib/api/about";
import { LicensePage } from "@/lib/api/_types/about/license";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import Loading from "./loading";

export default async function LicensingPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  const license: LicensePage = await getLicensePage(locale);

  if (license.id === -1) {
    return (
      <EmptyState
        message="라이선스 정보가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{license.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date(license.updated_at).toLocaleDateString(locale)}
          </p>
        </CardHeader>
        <CardContent>
          <div
            className="prose text-foreground"
            dangerouslySetInnerHTML={{ __html: license.content }}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
