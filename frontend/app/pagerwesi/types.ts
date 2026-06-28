export interface FortressNodeData {
  id: string;
  name: string;
  title: string;
  meaning: string;
  action: string;
  example: string;
}

export interface SymbolData {
  id: string;
  name: string;
  meaning: string;
}

export interface CeremonyStageData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  details: string[];
  offerings: string[];
  values: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface CommentData {
  id: string;
  name: string;
  comment: string;
  date: string;
}
