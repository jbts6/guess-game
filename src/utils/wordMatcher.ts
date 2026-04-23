import type { LetterResult, Word } from '../types';
import grade1 from '../data/words/grade1.json';
import grade2 from '../data/words/grade2.json';
import grade3 from '../data/words/grade3.json';
import grade4 from '../data/words/grade4.json';
import grade5 from '../data/words/grade5.json';
import grade6 from '../data/words/grade6.json';
import grade7 from '../data/words/grade7.json';
import grade8 from '../data/words/grade8.json';
import grade9 from '../data/words/grade9.json';

const gradesData: Record<number, Word[]> = {
  1: grade1 as Word[],
  2: grade2 as Word[],
  3: grade3 as Word[],
  4: grade4 as Word[],
  5: grade5 as Word[],
  6: grade6 as Word[],
  7: grade7 as Word[],
  8: grade8 as Word[],
  9: grade9 as Word[],
};

export function matchWord(guess: string, answer: string): LetterResult[] {
  const result: LetterResult[] = [];
  
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    if (i < answer.length && letter.toLowerCase() === answer[i].toLowerCase()) {
      result.push({ letter, status: 'correct' });
    } else {
      result.push({ letter, status: 'wrong' });
    }
  }
  
  return result;
}

export function loadWordsUpToGrade(grade: number): Word[] {
  let allWords: Word[] = [];
  for (let i = 1; i <= grade; i++) {
    if (gradesData[i]) {
      allWords = allWords.concat(gradesData[i]);
    }
  }
  return allWords;
}

export function pickRandom<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty array');
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
