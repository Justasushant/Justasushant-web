
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  imageUrl: string;
  link: string;
  liveUrl: string;
  details: string;
  stack: string[];
  isOngoing?: boolean;
}

export interface Company {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  website: string;
  isOngoing?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
