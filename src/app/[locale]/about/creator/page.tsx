// src/app/[locale]/about/creator/page.tsx
import { redirect } from "next/navigation";
import { getCreators } from "@/lib/api/about";
import { Creator } from "../_types/creator";

export default async function CreatorRedirectPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const creators: Creator[] = await getCreators(locale);
  if (!creators.length) {
    throw new Error("No creators found");
  }

  redirect(`/${locale}/about/creator/${creators[0].slug}`);
}