export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  presentationData?: PresentationData;
}

export interface PresentationData {
  title: string;
  slides: Slide[];
}

export interface Slide {
  title: string;
  content: string[];
  layout?: 'title' | 'content' | 'titleAndContent';
  notes?: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
