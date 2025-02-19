// app/[locale]/page.tsx
import { redirect } from "next/navigation";

export default function RootLocalePage({
  params,
}: {
  params: { locale: string };
}) {
  redirect(`/${params.locale}/home`);
  return null;
}