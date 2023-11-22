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
            <p  className={styles.question}>Q{index+1}. {problem.question}</p>
            {problem.questionType === 'text' ? (
              <input
                type="text"
                value={userAnswers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            ) : (
              problem.choices.map((choice, choiceIndex) => (
                <div className={styles.choice}>
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
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default QuizSection;