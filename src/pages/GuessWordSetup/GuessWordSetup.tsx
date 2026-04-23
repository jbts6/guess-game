import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GuessWordSetup.module.css';

export function GuessWordSetup() {
  const [grade, setGrade] = useState(3);
  const [attempts, setAttempts] = useState(5);
  const [enableHint, setEnableHint] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/guess-word/play', { state: { grade, attempts, enableHint } });
  };

  return (
    <div className={styles.setup}>
      <h2 className={styles.title}>单词挑战设置</h2>
      
      <div className={styles.section}>
        <h3>选择年级词库 (1-9年级)</h3>
        <p className={styles.desc}>题目将从 1 年级到所选年级的合集词库中随机抽取</p>
        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(g => (
            <button
              key={g}
              className={`${styles.optionBtn} ${grade === g ? styles.selected : ''}`}
              onClick={() => setGrade(g)}
            >
              {g} 年级
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>选择挑战次数</h3>
        <div className={styles.grid}>
          {[3, 5, 8].map(a => (
            <button
              key={a}
              className={`${styles.optionBtn} ${attempts === a ? styles.selected : ''}`}
              onClick={() => setAttempts(a)}
            >
              {a} 次
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>开启提示</h3>
        <p className={styles.desc}>每次猜测前随机提示一个单词，不计入次数</p>
        <div className={styles.grid}>
          <button
            className={`${styles.optionBtn} ${enableHint ? styles.selected : ''}`}
            onClick={() => setEnableHint(true)}
          >
            是
          </button>
          <button
            className={`${styles.optionBtn} ${!enableHint ? styles.selected : ''}`}
            onClick={() => setEnableHint(false)}
          >
            否
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.startBtn} onClick={handleStart}>
          开始游戏 🚀
        </button>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          返回主页
        </button>
      </div>
    </div>
  );
}