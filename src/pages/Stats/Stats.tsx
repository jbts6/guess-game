import { useNavigate } from 'react-router-dom';
import { useStats } from '../../hooks/useStats';
import styles from './Stats.module.css';

export function Stats() {
  const { stats } = useStats();
  const navigate = useNavigate();

  const totalWinRate = stats.totalGames > 0 
    ? Math.round(((stats.wordWins + stats.figureWins) / stats.totalGames) * 100) 
    : 0;

  const wordWinRate = stats.wordGames > 0 
    ? Math.round((stats.wordWins / stats.wordGames) * 100) 
    : 0;

  const figureWinRate = stats.figureGames > 0 
    ? Math.round((stats.figureWins / stats.figureGames) * 100) 
    : 0;

  return (
    <div className={styles.stats}>
      <h2 className={styles.title}>📊 游戏统计详情</h2>

      <div className={styles.overview}>
        <div className={styles.statBox}>
          <span className={styles.value}>{stats.totalGames}</span>
          <span className={styles.label}>总场次</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.value}>{totalWinRate}%</span>
          <span className={styles.label}>总胜率</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.value}>{stats.currentStreak}</span>
          <span className={styles.label}>当前连胜</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.value}>{stats.bestStreak}</span>
          <span className={styles.label}>最高连胜</span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>🔤 猜单词统计</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span>游玩场次</span>
              <strong>{stats.wordGames}</strong>
            </div>
            <div className={styles.detailItem}>
              <span>胜利场次</span>
              <strong>{stats.wordWins}</strong>
            </div>
            <div className={styles.detailItem}>
              <span>胜率</span>
              <strong>{wordWinRate}%</strong>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>📜 猜历史人物统计</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span>游玩场次</span>
              <strong>{stats.figureGames}</strong>
            </div>
            <div className={styles.detailItem}>
              <span>胜利场次</span>
              <strong>{stats.figureWins}</strong>
            </div>
            <div className={styles.detailItem}>
              <span>胜率</span>
              <strong>{figureWinRate}%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.historySection}>
        <h3>🕰️ 最近记录</h3>
        {stats.history.length > 0 ? (
          <ul className={styles.historyList}>
            {stats.history.slice(0, 10).map((record, i) => (
              <li key={i} className={styles.historyItem}>
                <div className={styles.historyMain}>
                  <span className={styles.historyType}>
                    {record.type === 'word' ? '🔤 猜单词' : '📜 猜历史人物'}
                    {record.grade && ` (Lv.${record.grade})`}
                  </span>
                  <span className={styles.historyAnswer}>
                    <strong>答案:</strong> {record.answer || '未知'}
                  </span>
                  <span className={record.result === 'win' ? styles.historyWin : styles.historyLoss}>
                    {record.result === 'win' ? '胜利' : '失败'}
                  </span>
                  <span className={styles.historyAttempts}>
                    {record.attempts ? `${record.attempts}次猜测` : ''}
                  </span>
                  <span className={styles.historyDate}>
                    {new Date(record.date).toLocaleString()}
                  </span>
                </div>
                {record.guesses && record.guesses.length > 0 && (
                  <div className={styles.historyGuesses}>
                    <strong>猜测过程:</strong> {record.guesses.join(' ➔ ')}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>暂无游戏记录，快去玩一把吧！</p>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          返回主页
        </button>
      </div>
    </div>
  );
}