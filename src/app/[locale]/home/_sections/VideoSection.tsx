import React from 'react';
import { Card } from 'shadcn/ui';

const VideoSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Videos</h2>
        <ul>
          <li>Video 1</li>
          <li>Video 2</li>
          <li>Video 3</li>
        </ul>
      </div>
    </Card>
  );
};

export default VideoSection;
