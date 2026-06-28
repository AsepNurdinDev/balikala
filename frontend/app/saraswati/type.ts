export interface SymbolData {
  id: string;
  name: string;
  emoji: string;
  meaning: string;
  value: string;
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  modelPath: string;
}

export interface CeremonyStep {
  id: string;
  stepNumber: number;
  name: string;
  description: string;
  details: string[];
}

export interface PhilosophyValue {
  id: string;
  title: string;
  concept: string;
  description: string;
  example: string;
}

export interface CommentData {
  id: string;
  name: string;
  comment: string;
  date: string;
}
