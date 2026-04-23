import { useState, useEffect, useCallback } from 'react';
import type { GuessWordState, GameStatus } from '../types';
import { loadWordsUpToGrade, pickRandom } from '../utils/wordMatcher';

export function useGuessWord(grade: number, maxAttempts: number, enableHint: boolean = false) {
  const [state, setState] = useState<GuessWordState>({
    answer: null,
    hintWord: null,
    guesses: [],
    maxAttempts,
    grade,
    status: 'playing',
    error: null,
  });

  const [, setPlayedWords] = useState<Set<string>>(new Set());

  const initGame = useCallback(() => {
    try {
      const words = loadWordsUpToGrade(grade);
      setPlayedWords(prevPlayed => {
        let availableWords = words.filter(w => !prevPlayed.has(w.word));
        
        // If all words have been played, reset the played list
        if (availableWords.length === 0) {
          availableWords = words;
          const answer = pickRandom(availableWords);
          const next = new Set<string>();
          next.add(answer.word);
          
          let hintWord = null;
          if (enableHint) {
            const sameLengthWords = words.filter(w => w.word.length === answer.word.length && w.word !== answer.word);
            if (sameLengthWords.length > 0) {
              hintWord = pickRandom(sameLengthWords).word.toLowerCase();
            }
          }
          
          setState({
            answer,
            hintWord,
            guesses: [],
            maxAttempts,
            grade,
            status: 'playing',
            error: null,
          });
          
          return next;
        }
        
        const answer = pickRandom(availableWords);
        const next = new Set(prevPlayed);
        next.add(answer.word);
        
        let hintWord = null;
        if (enableHint) {
          const sameLengthWords = words.filter(w => w.word.length === answer.word.length && w.word !== answer.word);
          if (sameLengthWords.length > 0) {
            hintWord = pickRandom(sameLengthWords).word.toLowerCase();
          }
        }
        
        setState({
          answer,
          hintWord,
          guesses: [],
          maxAttempts,
          grade,
          status: 'playing',
          error: null,
        });
        
        return next;
      });
    } catch (e) {
      console.error(e);
      setState(prev => ({ ...prev, error: 'Failed to load words' }));
    }
  }, [grade, maxAttempts, enableHint]);

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

    if (state.guesses.includes(cleanGuess)) {
      setState(prev => ({ ...prev, error: '这个单词已经猜过啦' }));
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