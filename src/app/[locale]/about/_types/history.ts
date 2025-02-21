export interface HistoryEvent {
    id: number;
    date: string; // ISO 형식
    image?: string;
    title: string;
    description: string;
  }