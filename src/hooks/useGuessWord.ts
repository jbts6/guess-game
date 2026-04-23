import { useState, useEffect, useCallback } from 'react';
import type { Word, GuessWordState, GameStatus } from '../types';
import { loadWordsUpToGrade, pickRandom } from '../utils/wordMatcher';

export function useGuessWord(grade: number, maxAttempts: number) {
  const [state, setState] = useState<GuessWordState>({
    answer: null,
    guesses: [],
    maxAttempts,
    grade,
    status: 'playing',
    error: null,
  });

  const [playedWords, setPlayedWords] = useState<Set<string>>(new Set());

  const initGame = useCallback(() => {
    try {
      const words = loadWordsUpToGrade(grade);
      let availableWords = words.filter(w => !playedWords.has(w.word));
      
      // If all words have been played, reset the played list
      if (availableWords.length === 0) {
        setPlayedWords(new Set());
        availableWords = words;
      }
      
      const answer = pickRandom(availableWords);
      
      setPlayedWords(prev => {
        const next = new Set(prev);
        next.add(answer.word);
        return next;
      });

      setState({
        answer,
        guesses: [],
        maxAttempts,
        grade,
        status: 'playing',
        error: null,
      });
    } catch (e) {
      console.error(e);
      setState(prev => ({ ...prev, error: 'Failed to load words' }));
    }
  }, [grade, maxAttempts, playedWords]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const submitGuess = (guess: string) => {
    if (state.status !== 'playing' || !state.answer) return;
    
    const cleanGuess = guess.trim().toLowerCase();
    
    if (cleanGuess.length !== state.answer.word.length) {
      setState(prev => ({ ...prev, error: `Word must be ${state.answer!.word.length} letters long` }));
      return;
    }

    const words = loadWordsUpToGrade(grade);
    const isValidWord = words.some(w => w.word.toLowerCase() === cleanGuess);
    if (!isValidWord) {
      setState(prev => ({ ...prev, error: 'Not in word list' }));
      return;
    }

    const newGuesses = [...state.guesses, cleanGuess];
    let newStatus: GameStatus = 'playing';

    if (cleanGuess === state.answer.word.toLowerCase()) {
      newStatus = 'won';
    } else if (newGuesses.length >= state.maxAttempts) {
      newStatus = 'lost';
    }

    setState(prev => ({
      ...prev,
      guesses: newGuesses,
      status: newStatus,
      error: null,
    }));
  };

  const skipGame = () => {
    if (state.status !== 'playing') return;
    setState(prev => ({ ...prev, status: 'skipped', error: null }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    state,
    submitGuess,
    skipGame,
    initGame,
    clearError
  };
}