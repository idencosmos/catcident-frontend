// src/app/[locale]/events/_components/CalendarView.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Event } from "@/lib/api/_types/event";
import { Button } from "@/components/ui/button";

interface CalendarViewProps {
  events: Event[];
  locale: string;
}

export function CalendarView({ events, locale }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

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
  const startDay = firstDayOfMonth.getDay(); // 0 (일요일) ~ 6 (토요일)

  const eventsByDate = events.reduce((acc: Record<string, Event[]>, event) => {
    const dateStr = event.date.split("T")[0];
    acc[dateStr] = acc[dateStr] || [];
    acc[dateStr].push(event);
    return acc;
  }, {});

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startDay) || day > daysInMonth) {
          week.push(<td key={`${i}-${j}`} className="p-2"></td>);
        } else {
          const dateStr = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = eventsByDate[dateStr] || [];
          week.push(
            <td
              key={`${i}-${j}`}
              className="p-2 border text-center hover:bg-accent rounded-md"
            >
              <div className="relative">
                <span>{day}</span>
                {dayEvents.length > 0 && (
                  <span className="absolute top-0 right-0 text-xs text-primary">
                    •
                  </span>
                )}
              </div>
              {dayEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/${locale}/events/${event.id}`}
                  className="block text-sm text-foreground mt-1 line-clamp-1"
                >
                  {event.title}
                </Link>
              ))}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={prevMonth}>
            이전 달
          </Button>
          <CardTitle>
            {currentDate.toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
            })}
          </CardTitle>
          <Button variant="outline" onClick={nextMonth}>
            다음 달
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full table-fixed">
          <thead>
            <tr>
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <th key={day} className="p-2 text-center text-muted-foreground">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody>
        </table>
      </CardContent>
    </Card>
  );
}