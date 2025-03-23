"use client";

import { useState, type FC } from "react";
import { stripHtml } from "string-strip-html";
import { type Event } from "@/lib/api/_types/event";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { EventDetailPanel } from "./EventDetailPanel";

interface EventListViewProps {
  events: Event[];
  locale: string;
  category?: string;
}

export const EventListView: FC<EventListViewProps> = ({
  events,
  locale,
  category,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredEvents = category
    ? events.filter((event) => event.category?.slug === category)
    : events;

  if (filteredEvents.length === 0) {
    return (
      <EmptyState
        message="이 카테고리에는 현재 이벤트가 없습니다."
        actionLabel="다른 카테고리 보기"
        actionHref="/events"
      />
    );
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleEventClick(event)}
          >
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
              <p className="text-sm line-clamp-2">
                {event.description ? stripHtml(event.description).result : "No description available."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <EventDetailPanel
        event={selectedEvent}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        locale={locale}
      />
    </>
  );
};
