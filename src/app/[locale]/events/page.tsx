import { type Event } from "@/lib/api/_types/event";
import { getEvents } from "@/lib/api/events";
import { Suspense } from "react";
import Loading from "./loading";
import EventsClient from "./_components/EventsClient";

interface PageProps {
  params: { locale: string };
  searchParams: { category?: string; showEvent?: string };
}

export default async function EventsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const { locale } = await paramsPromise;
  const { category, showEvent } = await searchParamsPromise;

  const events: Event[] = await getEvents(locale);

  return (
    <Suspense fallback={<Loading />}>
      <EventsClient
        events={events}
        locale={locale}
        category={category}
        initialEventId={showEvent ? parseInt(showEvent) : undefined}
      />
    </Suspense>
  );
}
