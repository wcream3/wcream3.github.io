
export enum PrankCategory {
  VISUAL = 'Visual',
  AUDIO = 'Audio',
  GAMEPLAY = 'Gameplay',
  SOCIAL = 'Social',
  CHAOTIC = 'Chaotic'
}

export interface Player {
  id: string;
  name: string;
  isOnline: boolean;
  location: string;
  recentActivity: string;
  inventorySummary: string;
}

export interface PrankAction {
  id: string;
  name: string;
  category: PrankCategory;
  description: string;
  intensity: 'Low' | 'Medium' | 'High';
  commandTemplate: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  target: string;
  action: string;
  status: 'Success' | 'Failed' | 'Pending';
}

export interface GeminiPrankSuggestion {
  title: string;
  description: string;
  logic: string;
  command: string;
}
