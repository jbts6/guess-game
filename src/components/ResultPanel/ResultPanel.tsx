import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GameStatus } from '../../types';
import styles from './ResultPanel.module.css';

interface ResultPanelProps {
  status: GameStatus;
  title: string;
  details: React.ReactNode;
  onRetry: () => void;
}

export function ResultPanel({ status, title, details, onRetry }: ResultPanelProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onRetry();
      }
    };

    if (status !== 'playing') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, onRetry]);

  const getStatusText = () => {
    switch (status) {
      case 'won': return '🎉 恭喜你，猜对了！';
      case 'lost': return '😢 挑战失败';
      case 'skipped': return '⏭️ 已跳过';
      default: return '';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'won': return styles.won;
      case 'lost': return styles.lost;
      case 'skipped': return styles.skipped;
      default: return '';
    }
  };

  if (status === 'playing') return null;

  return (
    <div className={`${styles.panel} ${getStatusClass()}`}>
      <h2 className={styles.statusTitle}>{getStatusText()}</h2>
      <div className={styles.content}>
        <h3 className={styles.answerTitle}>{title}</h3>
        <div className={styles.details}>{details}</div>
      </div>
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onRetry}>再来一局 (Enter)</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => navigate('/')}>返回主页 (ESC)</button>
      </div>
    </div>
  );
}