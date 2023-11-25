import React from 'react';
import { Problem } from '../../types/Problem';
import styles from './styles.module.css'

type QuizSectionProps = {
    problems: Problem[];
    userAnswers: string[];
    handleAnswerChange: (index: number, value: string) => void;
};

const QuizSection: React.FC<QuizSectionProps> = ({ problems, userAnswers, handleAnswerChange }) => {
  return (      
    <div className={styles.quizSection}>
      <h1>Quiz</h1>
      {problems.map((problem, index) => (
        <div key={index} className={styles.questionSection}>
          <p className={styles.question}>Q{index+1}. {problem.question}</p>
          <div className={styles.questionbody}>
            {problem.questionType === 'text' ? (
              <textarea
                id={`textQuestion${index}`}
                name={`textQuestion${index}`}
                rows={5}
                cols={50}
                style={{ width: '70%', padding: '10px', borderRadius: '16px', backgroundColor: 'rgb(56,56,56)', borderColor: 'rgb(0,0,0)',resize: 'none',}}
                value={userAnswers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            ) : (
              problem.questionType === 'multipleChoice' ? (
                problem.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className={styles.choice}>
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value={choice}
                        checked={userAnswers[index] === choice}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                      />
                      {choice}
                    </label>
                  </div>
                ))
              ) : (
                <input
                  type="text"
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizSection;