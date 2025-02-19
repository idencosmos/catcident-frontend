// app/[locale]/home/page.tsx
import HeroSection from "./_sections/HeroSection";
import HighlightBook from "./_sections/HighlightBook";
import AboutAndAuthor from "./_sections/AboutAndAuthor";
import NewsEvents from "./_sections/NewsEvents";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <HighlightBook />
      <AboutAndAuthor />
      <NewsEvents />
    </div>
  );
}