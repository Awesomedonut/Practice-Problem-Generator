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
    <div id="quizSection" className={styles.quizSection}>
      <h1>Quiz</h1>
      {problems.map((problem, index) => (
        <div key={index} className={styles.questionSection}>
          <div     id={`question-${index + 1}`} 
    className={styles.question}
    dangerouslySetInnerHTML={{ __html: `Q${index + 1}. ${problem.question.replace(/\n/g, '<br>')}` }}
/>
          <div className={styles.questionbody}>
            {problem.questionType === 'text' ? (
              <textarea
                id={`textQuestion${index}`}
                name={`textQuestion${index}`}
                rows={5}
                cols={50}
                style={{ width: '100%', padding: '10px', borderRadius: '16px', color:'white', backgroundColor: 'rgb(56,56,56)', border: 'none',resize: 'none',}}
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