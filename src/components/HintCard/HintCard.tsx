import styles from './HintCard.module.css';

interface HintCardProps {
  hint: string;
  index: number;
  total: number;
}

export function HintCard({ hint, index, total }: HintCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>提示 {index}/{total}</span>
      </div>
      <p className={styles.content}>{hint}</p>
    </div>
  );
}