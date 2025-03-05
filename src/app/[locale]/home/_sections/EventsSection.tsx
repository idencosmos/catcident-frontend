import React from 'react';
import { Card } from 'shadcn/ui';

const EventsSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Events</h2>
        <ul>
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
        </ul>
      </div>
    </Card>
  );
};

export default EventsSection;
