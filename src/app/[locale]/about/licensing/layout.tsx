import { Suspense } from "react";
import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function LicensingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="space-y-4 sm:space-y-6 md:space-y-8">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Container>
  );
}
