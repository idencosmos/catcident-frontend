// src/app/[locale]/about/history/page.tsx
import { getHistoryEvents } from "@/lib/api/about";
import { HistoryEvent } from "../_types/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";

export default async function HistoryPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const events: HistoryEvent[] = await getHistoryEvents(locale);

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-8">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col md:flex-row gap-4">
            <CardHeader className="w-full md:w-1/4">
              <CardTitle>{new Date(event.date).toLocaleDateString(locale)}</CardTitle>
            </CardHeader>
            <CardContent className="w-full md:w-3/4 space-y-2">
              {event.image && (
                <Image
                  src={event.image}
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