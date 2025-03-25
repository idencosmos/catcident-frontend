import { Suspense } from "react";
import Container from "@/components/common/Container";
import Loading from "./loading";

export default async function CharactersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Container>
  );
}
