import { getEvent } from "@/lib/api/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";
import { Event } from "@/lib/api/_types/event";
import { EmptyState } from "@/components/ui/empty-state";

export default async function EventDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await paramsPromise;
  const event: Event = await getEvent(parseInt(id), locale);

  if (event.id === -1) {
    return (
      <EmptyState
        message="요청한 이벤트가 없습니다. 삭제되었거나 존재하지 않는 페이지입니다."
        actionLabel="이벤트 목록으로 돌아가기"
        actionHref={`/${locale}/events`}
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(event.date).toLocaleDateString(locale)}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {event.main_image && (
            <Image
              src={event.main_image.file}
              alt={event.title}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          )}
          <div
            className="prose text-foreground"
            dangerouslySetInnerHTML={{ __html: event.description || "" }}
          />
          {event.main_image && (
            <p className="text-sm text-muted-foreground">
              이미지 업로드: {new Date(event.main_image.uploaded_at).toLocaleString(locale)}
            </p>
          )}
        </CardContent>
      </Card>
    </Suspense>
  );
}