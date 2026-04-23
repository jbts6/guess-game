import { useState, useEffect } from 'react';
import type { GameStats, GameRecord } from '../types';

const STATS_KEY = 'guess_game_stats';

const defaultStats: GameStats = {
  totalGames: 0,
  wordGames: 0,
  wordWins: 0,
  figureGames: 0,
  figureWins: 0,
  currentStreak: 0,
  bestStreak: 0,
  history: []
};

export function useStats() {
  const [stats, setStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as GameStats;
      } catch (e) {
        console.error('Failed to parse stats', e);
      }
    }
    return defaultStats;
  });

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordGame = (record: Omit<GameRecord, 'date'>) => {
    const newRecord: GameRecord = {
      ...record,
      date: new Date().toISOString()
    };

    setStats(prev => {
      const isWin = record.result === 'win';
      const newStreak = isWin ? prev.currentStreak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);

      return {
        ...prev,
        totalGames: prev.totalGames + 1,
        wordGames: prev.wordGames + (record.type === 'word' ? 1 : 0),
        wordWins: prev.wordWins + (record.type === 'word' && isWin ? 1 : 0),
        figureGames: prev.figureGames + (record.type === 'figure' ? 1 : 0),
        figureWins: prev.figureWins + (record.type === 'figure' && isWin ? 1 : 0),
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        history: [newRecord, ...prev.history] // Keep newest first
      };
    });
  };

  return {
    stats,
    recordGame
  };
}