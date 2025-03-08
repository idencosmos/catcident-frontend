import { Suspense } from "react";

import { setRequestLocale } from "next-intl/server";

import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function CharactersLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  setRequestLocale(locale);

  return (
    <Container>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Container>
  );
}
