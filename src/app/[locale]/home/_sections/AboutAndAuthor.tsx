import { aboutData } from "../_data/homeData";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function AboutAndAuthor() {
  const {
    aboutTitle,
    aboutDescription,
    authorTitle,
    authorPhoto,
    authorPhotoAlt,
    authorDescription,
  } = aboutData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* About Card */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{aboutTitle}</h2>
        <p className="text-base text-foreground">{aboutDescription}</p>
      </Card>

      {/* Author Card */}
      <Card className="p-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-4">{authorTitle}</h2>
        <Image
          src={authorPhoto}
          alt={authorPhotoAlt}
          width={120}
          height={120}
          className="rounded-full shadow-md mb-4"
        />
        <p className="text-base text-foreground max-w-xs">
          {authorDescription}
        </p>
      </Card>
    </div>
  );
}