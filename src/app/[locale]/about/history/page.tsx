import { Suspense } from "react";
import Image from "next/image";
import { getHistoryEvents } from "@/lib/api/about";
import { HistoryEvent } from "@/lib/api/_types/about/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import Loading from "./loading";
import DOMPurify from "isomorphic-dompurify";
import { PROSE_STYLES } from "@/constants/styles";

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
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <CardHeader className="w-full md:w-1/4 p-4 sm:p-6 md:p-8 bg-muted/20">
              <CardTitle className="text-primary">
                {new Date(event.date).toLocaleDateString(locale)}
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full md:w-3/4 p-4 sm:p-6 md:p-8 space-y-3">
              {event.image && (
                <div className="mb-4">
                  <Image
                    src={event.image.file}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold md:text-xl">
                {event.title}
              </h3>
              <div
                className={PROSE_STYLES.ckeditor}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(event.description),
                }}
              />
            </CardContent>
          </div>
        </Card>
      ))}
    </Suspense>
  );
}
