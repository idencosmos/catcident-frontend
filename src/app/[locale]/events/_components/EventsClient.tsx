"use client";

import { useState, useEffect, type FC } from "react";
import { type Event } from "@/lib/api/_types/event";
import { getEvent } from "@/lib/api/events";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Loading from "../loading";
import { CalendarView } from "./CalendarView";
import { EventListView } from "./EventListView";
import { EventDetailPanel } from "./EventDetailPanel";

interface EventsClientProps {
  events: Event[];
  locale: string;
  category?: string;
  initialEventId?: number;
}

const EventsClient: FC<EventsClientProps> = ({ 
  events, 
  locale, 
  category, 
  initialEventId 
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(!!initialEventId);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!initialEventId) return;
      
      setIsLoading(true);
      try {
        const event = await getEvent(initialEventId, locale);
        if (event && event.id !== -1) {
          setSelectedEvent(event);
          setIsPanelOpen(true);
        }
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEvent();
  }, [initialEventId, locale]);

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("showEvent");
    window.history.replaceState({}, "", url);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">리스트 뷰</TabsTrigger>
          <TabsTrigger value="calendar">캘린더 뷰</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <EventListView 
            events={events} 
            locale={locale} 
            category={category} 
          />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView 
            events={events} 
            locale={locale} 
          />
        </TabsContent>
      </Tabs>
      
      <EventDetailPanel
        event={selectedEvent}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        locale={locale}
      />
    </div>
  );
};

export default EventsClient;