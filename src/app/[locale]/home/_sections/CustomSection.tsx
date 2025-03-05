// src/app/[locale]/home/_sections/CustomSection.tsx
import { Card } from "@/components/ui/card";

interface CustomSectionProps {
  content: string;
}

export default function CustomSection({ content }: CustomSectionProps) {
  return (
    <Card className="p-6">
      <div
        className="prose text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Card>
  );
}
