import { useState, useEffect, useCallback } from 'react';
import type { Figure, GuessFigureState, GameStatus } from '../types';
import chineseFigures from '../data/figures/chinese_figures.json';

const pickRandom = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export function useGuessFigure() {
  const [state, setState] = useState<GuessFigureState>({
    answer: null,
    revealedHints: [],
    remainingHints: [],
    guessHistory: [],
    status: 'playing',
  });

  const [playedFigures, setPlayedFigures] = useState<Set<string>>(new Set());

  const initGame = useCallback(() => {
    const figures = chineseFigures as Figure[];
    setPlayedFigures(prevPlayed => {
      let availableFigures = figures.filter(f => !prevPlayed.has(f.name));
      
      // If all figures have been played, reset the played list
      if (availableFigures.length === 0) {
        availableFigures = figures;
        const answer = pickRandom(availableFigures);
        const next = new Set<string>();
        next.add(answer.name);
        
        const shuffledHints = [...answer.hints].sort(() => Math.random() - 0.5);
        setState({
          answer,
          revealedHints: [shuffledHints[0]],
          remainingHints: shuffledHints.slice(1),
          guessHistory: [],
          status: 'playing',
        });
        
        return next;
      }
      
      const answer = pickRandom(availableFigures);
      const next = new Set(prevPlayed);
      next.add(answer.name);
      
      const shuffledHints = [...answer.hints].sort(() => Math.random() - 0.5);
      setState({
        answer,
        revealedHints: [shuffledHints[0]],
        remainingHints: shuffledHints.slice(1),
        guessHistory: [],
        status: 'playing',
      });
      
      return next;
    });
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const submitGuess = (guess: string) => {
    if (state.status !== 'playing' || !state.answer) return;
    
    const cleanGuess = guess.trim();
    if (!cleanGuess) return;

    if (state.guessHistory.includes(cleanGuess)) {
      return;
    }

    const newHistory = [...state.guessHistory, cleanGuess];
    
    const isMatch = 
      state.answer.name === cleanGuess || 
      state.answer.aliases.some(alias => alias === cleanGuess);

    if (isMatch) {
      setState(prev => ({
        ...prev,
        guessHistory: newHistory,
        status: 'won',
      }));
    } else {
      if (state.remainingHints.length > 0) {
        setState(prev => ({
          ...prev,
          guessHistory: newHistory,
          revealedHints: [...prev.revealedHints, prev.remainingHints[0]],
          remainingHints: prev.remainingHints.slice(1),
        }));
      } else {
        setState(prev => ({
          ...prev,
          guessHistory: newHistory,
          status: 'lost',
        }));
      }
    }
  };

  const skipGame = () => {
    if (state.status !== 'playing') return;
    setState(prev => ({ ...prev, status: 'lost' }));
  };

  return {
    state,
    submitGuess,
    skipGame,
    initGame,
  };
}