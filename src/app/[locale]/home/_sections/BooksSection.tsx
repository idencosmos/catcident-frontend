import React from 'react';
import { Card } from 'shadcn/ui';

const BooksSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Books</h2>
        <ul>
          <li>Book 1</li>
          <li>Book 2</li>
          <li>Book 3</li>
        </ul>
      </div>
    </Card>
  );
};

export default BooksSection;
