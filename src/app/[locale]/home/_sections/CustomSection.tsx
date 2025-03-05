// src/app/[locale]/home/_sections/CustomSection.tsx

interface CustomSectionProps {
  content: string;
}

export default function CustomSection({ content }: CustomSectionProps) {
  return (
    <div
      className="prose text-foreground"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
