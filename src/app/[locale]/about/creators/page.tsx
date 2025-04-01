// 목적: 크리에이터 목록 페이지 접근 시 첫 번째 크리에이터 상세 페이지로 리다이렉트
//       크리에이터 정보가 없으면 빈 상태 컴포넌트 표시
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

  // 리다이렉션 경로에 locale 명시적으로 포함
  redirect(`/${locale}/about/creators/${creators[0].slug}`);
}
