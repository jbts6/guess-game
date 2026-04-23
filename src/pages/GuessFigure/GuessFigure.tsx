import { useState, useEffect } from 'react';
import { useGuessFigure } from '../../hooks/useGuessFigure';
import { useStats } from '../../hooks/useStats';
import { HintCard } from '../../components/HintCard/HintCard';
import { ResultPanel } from '../../components/ResultPanel/ResultPanel';
import styles from './GuessFigure.module.css';

export function GuessFigure() {
  const { state, submitGuess, skipGame, initGame } = useGuessFigure();
  const { recordGame } = useStats();
  const [inputValue, setInputValue] = useState('');
  const [showAllHints, setShowAllHints] = useState(false);

  useEffect(() => {
    if (state.status === 'won' || state.status === 'lost') {
      recordGame({
        type: 'figure',
        result: state.status === 'won' ? 'win' : 'loss',
        attempts: state.guessHistory.length,
        answer: state.answer!.name,
        guesses: state.guessHistory
      });
    }
  }, [state.status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    submitGuess(inputValue);
    setInputValue('');
  };

  if (!state.answer) return <div className={styles.loading}>加载中...</div>;

  const currentHintIndex = state.revealedHints.length;
  const totalHints = 10;

  return (
    <div className={styles.figureGame}>
      <div className={styles.header}>
        <span className={styles.progress}>
          线索进度: {currentHintIndex} / {totalHints}
        </span>
      </div>

      {state.status === 'playing' ? (
        <div className={styles.gameArea}>
          <div className={styles.rulesPanel}>
            <strong>规则说明：</strong>
            <p>根据给出的线索猜测历史人物。猜错会揭示下一条线索。重复猜测的内容不计入记录。</p>
          </div>
          <div className={styles.hintContainer}>
            <HintCard 
              hint={state.revealedHints[state.revealedHints.length - 1]} 
              index={currentHintIndex} 
              total={totalHints} 
            />
          </div>

          {state.guessHistory.length > 0 && (
            <div className={styles.history}>
              <h3>往期线索与猜测：</h3>
              <div className={styles.historyList}>
                {state.guessHistory.map((guess, i) => (
                  <div key={i} className={styles.historyItem}>
                    <div className={styles.historyHint}>
                      <span className={styles.hintIndex}>{i + 1}.</span> {state.revealedHints[i]}
                    </div>
                    <div className={styles.historyGuess}>
                      <span className={styles.wrongTag}>❌ {guess}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.inputArea}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入历史人物的名字..."
                autoFocus
                className={styles.input}
              />
              <button type="submit" className={styles.submitBtn}>
                猜测
              </button>
            </div>
            <button type="button" onClick={skipGame} className={styles.skipBtn}>
              放弃本局
            </button>
          </form>
        </div>
      ) : (
        <ResultPanel
          status={state.status}
          title={state.answer.name}
          details={
            <div className={styles.figureDetails}>
              <p><strong>👑 别名：</strong>{state.answer.aliases.join('、') || '无'}</p>
              <div className={styles.desc}>
                <strong>📜 详细介绍：</strong>
                <p>{state.answer.detail}</p>
              </div>
              <div className={styles.hintsSection}>
                <button 
                  className={styles.toggleHintsBtn} 
                  onClick={() => setShowAllHints(!showAllHints)}
                >
                  {showAllHints ? '收起提示 ⬆️' : '查看所有提示 ⬇️'}
                </button>
                {showAllHints && (
                  <ul className={styles.allHintsList}>
                    {state.answer.hints.map((hint, i) => (
                      <li key={i}>
                        <span className={styles.hintNumber}>{i + 1}.</span> {hint}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          }
          onRetry={() => {
            setShowAllHints(false);
            initGame();
          }}
        />
      )}
    </div>
  );
}