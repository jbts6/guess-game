import type { GameStats } from '../../types';
import styles from './StatsBar.module.css';

interface StatsBarProps {
  stats: GameStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  const winRate = stats.totalGames > 0 
    ? Math.round(((stats.wordWins + stats.figureWins) / stats.totalGames) * 100) 
    : 0;

  return (
    <div className={styles.bar}>
      <div className={styles.item}>
        <span className={styles.value}>{stats.totalGames}</span>
        <span className={styles.label}>总场次</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.item}>
        <span className={styles.value}>{winRate}%</span>
        <span className={styles.label}>总胜率</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.item}>
        <span className={styles.value}>{stats.currentStreak}</span>
        <span className={styles.label}>当前连胜</span>
      </div>
    </div>
  );
}