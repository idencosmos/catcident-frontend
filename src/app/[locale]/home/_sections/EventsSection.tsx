// src/app/[locale]/home/_sections/EventsSection.tsx
import { getLatestEvents } from '@/lib/api/home';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Event } from '@/lib/api/_types/event';

interface EventsSectionProps {
  locale: string;
}

export default async function EventsSection({ locale }: EventsSectionProps) {
  const events: Event[] = await getLatestEvents(locale, 2);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl">최신 이벤트</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <Link key={event.id} href={`/${locale}/events/${event.id}`}>
              <div className="hover:shadow-lg transition-shadow p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString(locale)}
                </p>
                <p className="text-sm text-foreground line-clamp-2">
                  {event.description.replace(/<[^>]+>/g, '')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}