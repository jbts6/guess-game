import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGuessWord } from '../../hooks/useGuessWord';
import { useStats } from '../../hooks/useStats';
import { matchWord } from '../../utils/wordMatcher';
import { WordRow } from '../../components/WordRow/WordRow';
import { ResultPanel } from '../../components/ResultPanel/ResultPanel';
import styles from './GuessWordPlay.module.css';

export function GuessWordPlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { grade, attempts } = location.state || { grade: 3, attempts: 5 };
  
  const { state, submitGuess, skipGame, initGame, clearError } = useGuessWord(grade, attempts);
  const { recordGame } = useStats();
  const [inputValue, setInputValue] = useState('');

  // Record stats when game ends
  useEffect(() => {
    if (state.status === 'won' || state.status === 'lost' || state.status === 'skipped') {
      recordGame({
        type: 'word',
        grade,
        result: state.status === 'won' ? 'win' : 'loss',
        attempts: state.guesses.length,
        answer: state.answer!.word,
        guesses: state.guesses
      });
    }
  }, [state.status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    submitGuess(inputValue);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (state.error) clearError();
  };

  if (!state.answer) return <div className={styles.loading}>加载中...</div>;

  const wordLength = state.answer.word.length;

  return (
    <div className={styles.play}>
      <div className={styles.header}>
        <span className={styles.gradeTag}>{grade}年级词库</span>
        <span className={styles.progress}>
          进度: {state.guesses.length} / {state.maxAttempts}
        </span>
      </div>

      {state.status === 'playing' ? (
        <div className={styles.gameArea}>
          <div className={styles.board}>
            {state.guesses.map((guess, i) => (
              <WordRow key={i} letters={matchWord(guess, state.answer!.word)} />
            ))}
            
            {/* Current input row */}
            <div className={styles.currentRow}>
              {Array.from({ length: wordLength }).map((_, i) => (
                <div key={i} className={styles.emptyTile}>
                  {inputValue[i]?.toUpperCase() || ''}
                </div>
              ))}
            </div>

            {/* Empty remaining rows */}
            {Array.from({ length: Math.max(0, state.maxAttempts - state.guesses.length - 1) }).map((_, i) => (
              <div key={`empty-${i}`} className={styles.emptyRow}>
                {Array.from({ length: wordLength }).map((_, j) => (
                  <div key={j} className={styles.emptyTile}></div>
                ))}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputArea}>
            {state.error && <div className={styles.error}>{state.error}</div>}
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                maxLength={wordLength}
                placeholder={`输入 ${wordLength} 个字母的单词`}
                autoFocus
                className={styles.input}
              />
              <button type="submit" className={styles.submitBtn}>
                提交
              </button>
            </div>
            <button type="button" onClick={skipGame} className={styles.skipBtn}>
              跳过本局
            </button>
          </form>
        </div>
      ) : (
        <ResultPanel
          status={state.status}
          title={state.answer.word}
          details={
            <div className={styles.wordDetails}>
              <p><strong>📝 翻译：</strong>{state.answer.translation}</p>
              <p><strong>📖 用法：</strong>{state.answer.usage}</p>
              <div className={styles.examples}>
                <strong>💡 例句：</strong>
                <ul>
                  {state.answer.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          }
          onRetry={initGame}
        />
      )}
    </div>
  );
}