// src/app/[locale]/about/licensing/page.tsx
import { getLicensePage } from "@/lib/api/about";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import Loading from "./loading";
import { LicensePage } from "../_types/license";

export default async function LicensingPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const license: LicensePage = await getLicensePage(locale);

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{license.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(license.updated_at).toLocaleDateString(locale)}
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