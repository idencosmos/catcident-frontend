import Link from "next/link";
import { Suspense } from "react";

import { getEvents } from "@/lib/api/events";
import { Event } from "@/lib/api/_types/event";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";

import Loading from "./loading";
import { CalendarView } from "./_components/CalendarView";

async function EventsList({
  locale,
  category,
}: {
  locale: string;
  category?: string;
}) {
  const events: Event[] = await getEvents(locale);
  const filteredEvents = category
    ? events.filter((event) => event.category?.slug === category)
    : events;

  if (filteredEvents.length === 0) {
    return (
      <EmptyState
        message="이 카테고리에는 현재 이벤트가 없습니다."
        actionLabel="다른 카테고리 보기"
        actionHref={`/${locale}/events`}
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredEvents.map((event) => (
        <Link key={event.id} href={`/${locale}/events/${event.id}`}>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold">
                {event.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <p className="text-sm text-foreground line-clamp-2">
                {event.description.replace(/<[^>]+>/g, "")}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default async function EventsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await paramsPromise;
  const { category } = await searchParamsPromise;

  const events = await getEvents(locale);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">리스트 뷰</TabsTrigger>
          <TabsTrigger value="calendar">캘린더 뷰</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Suspense fallback={<Loading />}>
            <EventsList locale={locale} category={category} />
          </Suspense>
        </TabsContent>
        <TabsContent value="calendar">
          <Suspense fallback={<Loading />}>
            <CalendarView events={events} locale={locale} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
