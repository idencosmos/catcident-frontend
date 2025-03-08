// src/components/common/empty-state.tsx
"use client"; // 클라이언트 컴포넌트로 변환

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  showRefresh?: boolean; // 새로고침 버튼 표시 여부를 prop으로 전달
}

export function EmptyState({
  message,
  actionLabel,
  actionHref,
  showRefresh,
}: EmptyStateProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground text-lg">{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="outline" className="mt-4">
            {actionLabel}
          </Button>
        </Link>
      )}
      {showRefresh && (
        <Button variant="outline" className="mt-4 ml-2" onClick={handleRefresh}>
          Refresh
        </Button>
      )}
    </div>
  );
}