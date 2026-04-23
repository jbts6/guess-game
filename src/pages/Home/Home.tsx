import { Link, useNavigate } from 'react-router-dom';
import { useStats } from '../../hooks/useStats';
import { StatsBar } from '../../components/StatsBar/StatsBar';
import styles from './Home.module.css';

export function Home() {
  const { stats } = useStats();
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h2 className={styles.title}>选择你的挑战</h2>
      
      <StatsBar stats={stats} />

      <div className={styles.cards}>
        <div 
          className={`${styles.card} ${styles.wordCard}`}
          onClick={() => navigate('/guess-word/setup')}
        >
          <div className={styles.icon}>🔤</div>
          <h3>猜单词</h3>
          <p>看提示猜英语单词，巩固词汇量！</p>
          <button className={styles.playBtn}>开始挑战</button>
        </div>

        <div 
          className={`${styles.card} ${styles.figureCard}`}
          onClick={() => navigate('/guess-figure')}
        >
          <div className={styles.icon}>📜</div>
          <h3>猜历史人物</h3>
          <p>根据线索猜出中国古代著名历史人物！</p>
          <button className={styles.playBtn}>开始挑战</button>
        </div>
      </div>

      <div className={styles.footer}>
        <Link to="/stats" className={styles.statsLink}>
          📊 查看详细统计数据
        </Link>
      </div>
    </div>
  );
}