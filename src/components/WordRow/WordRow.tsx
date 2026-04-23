import type { LetterResult } from '../../types';
import { LetterTile } from '../LetterTile/LetterTile';
import styles from './WordRow.module.css';

interface WordRowProps {
  letters: LetterResult[];
}

export function WordRow({ letters }: WordRowProps) {
  return (
    <div className={styles.row}>
      {letters.map((result, index) => (
        <LetterTile key={index} letter={result.letter} status={result.status} />
      ))}
    </div>
  );
}