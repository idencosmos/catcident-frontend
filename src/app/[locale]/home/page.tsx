import { Grid, Container } from "shadcn/ui";
import AuthorsSection from "./_sections/AuthorsSection";
import BooksSection from "./_sections/BooksSection";
import CustomSection from "./_sections/CustomSection";
import EventsSection from "./_sections/EventsSection";
import HeroSection from "./_sections/HeroSection";
import NewsSection from "./_sections/NewsSection";
import VideoSection from "./_sections/VideoSection";

export default function HomePage() {
  return (
    <Container>
      <Grid gap={4} templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
        <div className="col-span-2">
          <HeroSection />
        </div>
        <div className="col-span-1">
          <AuthorsSection />
        </div>
        <div className="col-span-1">
          <BooksSection />
        </div>
        <div className="col-span-1">
          <CustomSection />
        </div>
        <div className="col-span-1">
          <EventsSection />
        </div>
        <div className="col-span-1">
          <NewsSection />
        </div>
        <div className="col-span-1">
          <VideoSection />
        </div>
      </Grid>
    </Container>
  );
}
