import { Suspense } from "react";

import { setRequestLocale } from "next-intl/server";

import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function HistoryLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);

  return (
    <Container className="space-y-4 sm:space-y-6 md:space-y-8">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Container>
  );
}
