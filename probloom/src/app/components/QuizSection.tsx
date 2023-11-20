import React from 'react';
import styles from '../page.module.css';
import { Problem } from '../types/Problem';
type QuizSectionProps = {
    problems: Problem[];
    userAnswers: string[];
    handleAnswerChange: (index: number, value: string) => void;
  };
  
  const QuizSection: React.FC<QuizSectionProps> = ({ problems, userAnswers, handleAnswerChange }) => {
    return (
      <div className={styles.quizSection}>
        {problems.map((problem, index) => (
          <div key={index} className={styles.question}>
            <p>{problem.question}</p>
            {problem.questionType === 'text' ? (
              <input
                type="text"
                value={userAnswers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            ) : (
              problem.choices.map((choice, choiceIndex) => (
                <label key={choiceIndex}>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={choice}
                    checked={userAnswers[index] === choice}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                  {choice}
                </label>
              ))
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default QuizSection;