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
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
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
      "question": "question here", 
    "questionType": "multipleChoice or text", 
    "choices":["choice 1","choice 2","choice 3","choice 4"], 
    "answer":"answer here"}]
    The JSON response:`, setUpQuiz);
  }

  const setUpQuiz = (responseOjbect: any) =>{
    setProblems(JSON.parse(responseOjbect));
    console.log(Array.isArray(JSON.parse(responseOjbect)));    
  }

  async function checkUserAnswers() { //TODO: bug fix - figured out issue, server related due to vercel's free tier having only 10s
    // handleGeneration(`Create a solution for this problem: ${problems}`, setSolutions);
  }
  const handleAnswerChange = (index: any, value: any) => {
    setUserAnswers({ ...userAnswers, [index]: value });
  };

  const handleSubmit = () => {
    const userAnswersEntries = Object.entries(userAnswers);
    console.log('User Answers:', userAnswersEntries);
    console.log('Questions:', problems.map((problem) => problem.question));
  
    const userAnswersText = userAnswersEntries.map(([index, answer]) => `Answer ${parseInt(index) + 1}: ${answer}`).join(', ');
    const questionsText = problems.map((problem, index) => `Question ${index + 1}: ${problem.question}`).join(', ');
    const prompt = 
    `I have ${userAnswersEntries.length} answers: ${userAnswersText} 
    for these ${problems.length} questions: ${questionsText}
    please check my answers and give me feedback
    `;
    console.log(prompt);
    handleGeneration(prompt , setSolutions);
  };
  

  return (
  <div className={styles.page}>
    <div className={styles.content}>
      <div>
        <div className={styles.mainTitleDiv}>
          <img src="FlowerLogo.png" height="80"/>
          <h1 className={styles.mainTitle}>Probloom</h1>
          <p className={styles.subtitle}>Let Your Problems Blossom</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputDiv}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
          /> 
        </div>
        <div className={styles.inputDiv}>
  <select
    value={questionType}
    onChange={(e) => setQuestionType(e.target.value)}
    className={styles.dropdown}
  >
    <option value="multipleChoice">Select Question Type</option>
    <option value="multipleChoice">Multiple Choice</option>
    <option value="text">Text</option>
  </select>
</div>

        <div className={styles.buttonsDiv}>
          <button onClick={handleGenerateProblems} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Problem'}
          </button>
        </div>
      </div>
      {problems && Array.isArray(problems) && <div>
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
                      value={ userAnswers[index] || ''}
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
                            checked={
                              userAnswers[index] === choice
                            }
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
              <button onClick={checkUserAnswers} disabled={loading}>
            {loading ? 'Checking...' : 'Check Answers'}
          </button>
            </div>
          )}
        </div>
      </div>
    </div>
        </div>}
      {solutions && <div>{solutions}</div>}
    </div>
  </div>

  );
}
// [ { "question": "What does the keyword 'static' mean in Java?", "questionType": "text", "answer": "A 'static' member belongs to the type itself, not to any instance of the type." }, { "question": "What is the main purpose of Garbage Collection in Java?", "questionType": "text", "answer": "Garbage Collection is used to automatically manage the memory and clean up unused objects to free memory space." } ]
// [{ "question": "What is the correct way to instantiate an object in Java?", "questionType": "multipleChoice", "choices":["Object object = new Object()", "Object = new Object()", "new Object = Object()", "Object() new = Object"], "answer":"Object object = new Object()" }, { "question": "The process of converting the code into byte code in Java is called ________.", "questionType": "multipleChoice", "choices":["Compilation", "Execution", "Interpretation", "Translation"], "answer":"Compilation" }]
