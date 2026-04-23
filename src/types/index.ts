export interface Word {
  word: string;
  translation: string;
  usage: string;
  examples: string[];
}

export interface Figure {
  name: string;
  aliases: string[];
  hints: string[];
  detail: string;
}

export type GameStatus = 'playing' | 'won' | 'lost' | 'skipped';

export interface GuessWordState {
  answer: Word | null;
  hintWord?: string | null;
  guesses: string[];
  maxAttempts: number;
  grade: number;
  status: GameStatus;
  error: string | null;
}

export interface GuessFigureState {
  answer: Figure | null;
  revealedHints: string[];
  remainingHints: string[];
  guessHistory: string[];
  status: GameStatus;
}

export type LetterStatus = 'correct' | 'wrong' | 'empty';

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export interface GameRecord {
  type: 'word' | 'figure';
  grade?: number;
  result: 'win' | 'loss';
  attempts?: number;
  date: string;
  answer: string;
  guesses: string[];
}

export interface GameStats {
  totalGames: number;
  wordGames: number;
  wordWins: number;
  figureGames: number;
  figureWins: number;
  currentStreak: number;
  bestStreak: number;
  history: GameRecord[];
}