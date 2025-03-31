// 라이선스 정보 페이지 컴포넌트
// 서비스의 라이선스 정보와 마지막 업데이트 날짜를 표시합니다.

import { Suspense } from "react";
import { getLicensePage } from "@/lib/api/about";
import { LicensePage } from "@/lib/api/_types/about/license";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import DOMPurify from "isomorphic-dompurify";
import Loading from "./loading";
import { PROSE_STYLES } from "@/constants/styles";

export default async function LicensesPage({
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
            className={PROSE_STYLES.default}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(license.content),
            }}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
