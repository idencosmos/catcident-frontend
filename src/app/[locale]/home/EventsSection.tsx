// src/app/[locale]/home/_sections/EventsSection.tsx
// 홈페이지에 표시될 이벤트 섹션 컴포넌트 - 다가오는 이벤트를 시각적으로 효과적으로 표시
import { stripHtml } from "string-strip-html";
import { Event } from "@/lib/api/_types/event";
import { getLatestEvents } from "@/lib/api/home";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDaysIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

interface EventsSectionProps {
  locale: string;
}

export default async function EventsSection({ locale }: EventsSectionProps) {
  const events: Event[] = await getLatestEvents(locale, 2);

  // 다국어 텍스트 설정
  const upcomingEventsTitle =
    locale === "ko" ? "다가오는 이벤트" : "Upcoming Events";
  const noDescriptionText =
    locale === "ko" ? "설명이 없습니다." : "No description available.";

  return (
    <div className="h-full flex flex-col">
      <CardTitle className="text-2xl mb-4 md:mb-6">{upcomingEventsTitle}</CardTitle>

      <div className="flex-1 flex flex-col space-y-4">
        {events.map((event) => {
          const eventDate = new Date(event.date);
          const isUpcoming = eventDate > new Date();

          return (
            <Link key={event.id} href={`/events?showEvent=${event.id}`}>
              <div className="group border rounded-lg overflow-hidden transition-all hover:shadow-md">
                <div className="p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    {isUpcoming && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-xs"
                      >
                        {locale === "ko" ? "예정됨" : "Upcoming"}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarDaysIcon className="w-3.5 h-3.5 mr-1" />
                      {eventDate.toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 mt-2 line-clamp-2">
                    {event.description
                      ? stripHtml(event.description).result
                      : noDescriptionText}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
