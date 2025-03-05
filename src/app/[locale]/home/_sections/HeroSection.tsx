import React from 'react';
import { Card } from 'shadcn/ui';

const HeroSection = () => {
  return (
    <Card className="w-full md:w-1/2">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg">Discover amazing content and stay updated with the latest news.</p>
      </div>
    </Card>
  );
};

export default HeroSection;
