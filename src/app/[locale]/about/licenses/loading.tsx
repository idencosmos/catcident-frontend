// src/app/[locale]/about/licenses/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
