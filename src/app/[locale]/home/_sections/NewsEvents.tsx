import { newsData } from "../_data/homeData";
import { Card } from "@/components/ui/card";

export default function NewsEvents() {
  const {
    title,
    latestNewsTitle,
    latestNewsContent,
    upcomingEventsTitle,
    upcomingEventsContent,
  } = newsData;

  return (
    <Card className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{latestNewsTitle}</h3>
          <p className="text-foreground text-sm">{latestNewsContent}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{upcomingEventsTitle}</h3>
          <p className="text-foreground text-sm">{upcomingEventsContent}</p>
        </div>
      </div>
    </Card>
  );
}