import React from 'react';
import { Card } from 'shadcn/ui';

const NewsSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">News</h2>
        <ul>
          <li>News Item 1</li>
          <li>News Item 2</li>
          <li>News Item 3</li>
        </ul>
      </div>
    </Card>
  );
};

export default NewsSection;
