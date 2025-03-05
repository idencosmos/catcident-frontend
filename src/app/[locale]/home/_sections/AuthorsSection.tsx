import React from 'react';
import { Card } from 'shadcn/ui';

const AuthorsSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Authors</h2>
        <ul>
          <li>Author 1</li>
          <li>Author 2</li>
          <li>Author 3</li>
        </ul>
      </div>
    </Card>
  );
};

export default AuthorsSection;
