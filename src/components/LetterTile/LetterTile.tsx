import type { LetterStatus } from '../../types';
import styles from './LetterTile.module.css';

interface LetterTileProps {
  letter: string;
  status: LetterStatus;
}

export function LetterTile({ letter, status }: LetterTileProps) {
  const className = `${styles.tile} ${styles[status]}`;
  
  return (
    <div className={className}>
      {letter.toUpperCase()}
    </div>
  );
}