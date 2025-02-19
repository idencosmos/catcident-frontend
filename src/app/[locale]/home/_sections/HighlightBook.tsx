import { highlightBookData } from "../_data/homeData";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function HighlightBook() {
  const { sectionTitle, bookTitle, author, description, imageUrl } =
    highlightBookData;

  return (
    <Card className="p-6">
      <h2 className="text-3xl font-bold mb-6">{sectionTitle}</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Image
          src={imageUrl}
          alt={bookTitle}
          width={200}
          height={300}
          className="rounded-md shadow-md"
        />
        <div>
          <h3 className="text-2xl font-semibold mb-2">{bookTitle}</h3>
          <p className="mb-2 text-sm text-muted-foreground">by {author}</p>
          <p className="text-base text-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}