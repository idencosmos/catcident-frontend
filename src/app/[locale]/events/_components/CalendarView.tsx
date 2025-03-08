"use client";

import { useState, type FC } from "react";
import { type Event } from "@/lib/api/_types/event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { EventDetailPanel } from "./EventDetailPanel";

interface CalendarViewProps {
  events: Event[];
  locale: string;
}

interface EventsByDate {
  [key: string]: Event[];
}

export const CalendarView: FC<CalendarViewProps> = ({ events, locale }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const eventsByDate = events.reduce<EventsByDate>((acc, event) => {
    const dateStr = event.date.split("T")[0];
    acc[dateStr] = [...(acc[dateStr] || []), event];
    return acc;
  }, {});

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const renderCalendarDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    const dayEvents = eventsByDate[dateStr] || [];
    const today = new Date();
    const isToday = 
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    return (
      <td
        key={`day-${day}`}
        className={`p-2 border text-center relative 
          ${isToday ? "bg-accent/30" : "hover:bg-accent/20"} 
          transition-colors duration-200 rounded-md`}
      >
        <span className={`inline-block w-7 h-7 rounded-full flex items-center justify-center
          ${isToday ? "bg-primary text-primary-foreground font-medium" : ""}`}>
          {day}
        </span>
        
        <div className="mt-1 space-y-1">
          {dayEvents.map((event) => (
            <button
              key={event.id}
              onClick={(e) => {
                e.preventDefault();
                handleEventClick(event);
              }}
              className="w-full text-left text-xs px-1 py-0.5 rounded bg-primary/10 hover:bg-primary/20 line-clamp-1 transition-colors"
            >
              {event.title}
            </button>
          ))}
        </div>
      </td>
    );
  };

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDay) || day > daysInMonth) {
          week.push(<td key={`empty-${i}-${j}`} className="p-2" />);
        } else {
          week.push(renderCalendarDay(day));
          day++;
        }
      }
      calendar.push(<tr key={`week-${i}`}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
    <th
      key={day}
      className={`p-2 text-center text-sm 
        ${index === 0 ? "text-red-500" : ""}
        ${index === 6 ? "text-blue-500" : ""}
        ${index > 0 && index < 6 ? "text-muted-foreground" : ""}`}
    >
      {day}
    </th>
  ));

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentDate(new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                ))}
                title="이전 달"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">이전 달</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentDate(new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                ))}
                title="다음 달"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">다음 달</span>
              </Button>
            </div>
            
            <CardTitle className="text-lg sm:text-xl">
              {currentDate.toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
              })}
            </CardTitle>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(new Date())}
              className="gap-1"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>오늘</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-separate border-spacing-1">
              <thead>
                <tr>{weekDays}</tr>
              </thead>
              <tbody>{renderCalendar()}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <EventDetailPanel
        event={selectedEvent}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        locale={locale}
      />
    </>
  );
};