'use client';

import { useState } from 'react';
import styles from './page.module.css';
import header from './components/Header/header';
import  {Kaushan_Script} from 'next/font/google';
import { useEffect } from 'react';

const kaushan = Kaushan_Script({
  weight: ['400', '400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})
interface TextQuestion {
  question: string;
  questionType: 'text';
  answer: string;
}

interface MultipleChoiceQuestion {
  question: string;
  questionType: 'multipleChoice';
  choices: string[];
  answer: string;
}

type Problem = TextQuestion | MultipleChoiceQuestion;

export default function Home() {
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]); // Update the state type
  const [solutions, setSolutions] = useState('');
  // const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGeneration(prompt: string, setFunction: any) {
    setLoading(true);
    setError('');

    console.log(prompt, setFunction);

    try {
      const response = await fetch('/api/openai', { //TODO: logic that ensures there are no repeat questions
        method: 'POST', //TODO: optimize api call?
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt:prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFunction(data.data);
    } catch (error) {
      console.error('Error calling /api/openai:', error);
      setError('There was an error generating a response. Please try again later.');
      if (error) {
        const timer = setTimeout(() => {
          setError('');
        }, 2000); // Adjust the delay to match the transition duration
  
        return () => clearTimeout(timer);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerationSolution(prompt: string, setFunction: any) {
    setLoading(true);
    setError('');

    console.log(prompt, setFunction);

    try {
      const response = await fetch('/api/openai', { //TODO: logic that ensures there are no repeat questions
        method: 'POST', //TODO: optimize api call?
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt:prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFunction(data.data);
    } catch (error) {
      console.error('Error calling /api/openai:', error);
      setError('There was an error generating a response. Please try again later.');
      if (error) {
        const timer = setTimeout(() => {
          setError('');
        }, 2000); // Adjust the delay to match the transition duration
  
        return () => clearTimeout(timer);
      }
    } finally {
      setLoading(false);
    }
  }
  async function handleGenerateProblems() {
    handleGeneration(`
    Create two short practice problem for the following topic: ${topic},
    the question type is ${questionType}. 
 if the question type is multipleChoice, give me choices,
    and answer. if the question type is text, only give me answer.
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
    [{
      'question': 'question here', 
    'questionType': 'multipleChoice or text', 
    'choices':['choice 1','choice 2','choice 3','choice 4'], 
    'answer':'answer here'}]
    The JSON response:`, setProblems);
  }

  async function handleGenerateSolutions() { //TODO: bug fix - figured out issue, server related due to vercel's free tier having only 10s
    handleGenerationSolution(`Create a solution for this problem: ${problems}`, setSolutions);
  }

  const handleAnswerChange = (index: any, value: any) => {
    // setUserAnswers({ ...userAnswers, [index]: value });
  };

  const handleSubmit = () => {
    // console.log('User Answers:', userAnswers);
    // Add submission logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Existing JSX elements... */}
        <div className={styles.quizSection}>
          {problems.length > 0 && (
            <div>
              {problems.map((problem, index) => (
                <div key={index} className={styles.question}>
                  <p>{problem.question}</p>
                  {problem.questionType === 'text' ? (
                    <input
                      type="text"
                      value={
                        // userAnswers[index] || 
                        ''}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  ) : (
                    <div>
                      {problem.choices.map((choice, choiceIndex) => (
                        <label key={choiceIndex}>
                          <input
                            type="radio"
                            name={`question${index}`}
                            value={choice}
                            // checked={
                            //   userAnswers[index] === choice
                            // }
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                          />
                          {choice}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button onClick={handleSubmit}>Submit Answers</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}