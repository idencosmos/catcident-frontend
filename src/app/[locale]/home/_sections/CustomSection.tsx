import React from 'react';
import { Card } from 'shadcn/ui';

const CustomSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Custom Section</h2>
        <p>This is a custom section.</p>
      </div>
    </Card>
  );
};

export default CustomSection;
