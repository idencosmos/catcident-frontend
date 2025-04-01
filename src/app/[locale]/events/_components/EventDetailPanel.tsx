"use client";
import { type FC, useEffect, useCallback } from "react";
import { type Event } from "@/lib/api/_types/event";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { PROSE_STYLES } from "@/constants/styles";

interface EventDetailPanelProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export const EventDetailPanel: FC<EventDetailPanelProps> = ({
  event,
  isOpen,
  onClose,
  locale,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !event) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="event-detail-title"
      aria-modal="true"
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-card dark:bg-card/95 p-4 rounded-t-lg shadow-lg w-full sm:rounded-lg sm:max-w-2xl sm:p-6 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 border dark:border-border/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="event-detail-title" className="text-xl font-semibold">
            이벤트 상세
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl">{event.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toLocaleDateString(locale)}
            </p>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            {event.main_image && (
              <Image
                src={event.main_image.file}
                alt={`${event.title} 이벤트 이미지`}
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            )}
            <div
              className={PROSE_STYLES.default}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(event.description || ""),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
