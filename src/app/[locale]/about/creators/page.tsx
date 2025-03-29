import { redirect } from "next/navigation";
import { getCreators } from "@/lib/api/about";
import { Creator } from "@/lib/api/_types/about/creator";
import { EmptyState } from "@/components/common/empty-state";

export default async function CreatorsRedirectPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;

  const creators: Creator[] = await getCreators(locale);
  if (creators.length === 0) {
    return <EmptyState message="크리에이터 정보가 없습니다." showRefresh />;
  }

  redirect(`/about/creators/${creators[0].slug}`);
}
