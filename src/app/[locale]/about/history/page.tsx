import { getHistoryEvents } from "@/lib/api/about";
import { HistoryEvent } from "@/lib/api/_types/about/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import { EmptyState } from "@/components/ui/empty-state";

export default async function HistoryPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await paramsPromise;
  const events: HistoryEvent[] = await getHistoryEvents(locale);

  if (events.length === 0) {
    return (
      <EmptyState
        message="히스토리 이벤트가 없습니다. 잠시 후 다시 시도해주세요."
        showRefresh
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="container py-6 px-4 space-y-8">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col md:flex-row gap-4">
            <CardHeader className="w-full md:w-1/4">
              <CardTitle>
                {new Date(event.date).toLocaleDateString(locale)}
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full md:w-3/4 space-y-2">
              {event.image && (
                <Image
                  src={event.image.file}
                  alt={event.title}
                  width={200}
                  height={150}
                  className="rounded-md"
                />
              )}
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-foreground">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Suspense>
  );
}
