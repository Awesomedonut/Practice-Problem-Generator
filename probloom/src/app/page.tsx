'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useEffect } from 'react';

import { Problem } from './types/Problem';
import QuizSection from './components/Quiz/QuizSection';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]); // Update the state type
  const [solutions, setSolutions] = useState('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTopic("java");
    setSolutions(`
    solutions here solutions here solutions here solutions here solutions here solutions 
    here solutions here solutions here solutions here solutions here solutions here solutions 
    here solutions here solutions here solutions here solutions here solutions here solutions 
    here solutions here solutions here solutions here solutions here solutions here solutions 
    here solutions here solutions here solutions here solutions here solutions here solutions 
    here solutions here solutions here solutions here solutions here solutions here solutions here `);
    setProblems([
      {
        question: "question here",
        questionType: "multipleChoice",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        answer: "answer here"
      },
      {
        question: "question here",
        questionType: "text",
        answer: "answer here"
      }
    ]);
  }, []);


  //handle file upload
const handleSubmitPDF = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target.file.files[0]);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
};

//TODO: move this function to another file

  async function handleGeneration(prompt: string, setFunction: any) {
    setLoading(true);
    setError('');

    console.log(prompt, setFunction);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
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
    Do not include any explanations, only provide a  RFC8259 compliant JSON response 
    following this format without deviation.
    [{
      "question": "question here", 
    "questionType": "multipleChoice or text", 
    "choices":["choice 1","choice 2","choice 3","choice 4"], 
    "answer":"answer here"}]
    The JSON response:`, setUpQuiz);
  }

  const setUpQuiz = (responseOjbect: any) =>{  
    setProblems(JSON.parse(responseOjbect));  
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
        <div className={styles.mainTitleDiv}>
          <img src="FlowerLogo.png" height="80"/>
          <h1 className={styles.mainTitle}>Probloom</h1>
          <p className={styles.subtitle}>Let Your Problems Blossom</p>
        </div>
        {error && <p className={styles.error}>{error}</p>} 
        <div className={styles.inputDiv}>

          <div className={styles.inputDiv}>
          {/* Added this to template file input tag */}
            <div className={styles.fileInputContainer}>
              <input type="file" id="pdfInput" accept="application/pdf" style={{ display: 'none' }} />
              <label htmlFor="pdfInput" className={styles.customFileInputButton}>Choose PDF</label>
            </div>
           </div>
            
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter topic" />
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className={styles.dropdown}>
            <option value="">Select Question Type</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="text">Text</option>
          </select>
        </div>
        <div className={styles.buttonsDiv}>
          <button onClick={handleGenerateProblems} disabled={loading}>{loading ? 'Generating...' : 'Generate Problem'}</button>
        </div>

         {/*added this to template the downloads button*/}
        <div>
          <button>download</button>
        </div>

        <div className={styles.quizSection}>

      </div>
      <div className={styles.TopicBox}>
        <p>{topic}</p>
      </div>
      <div className={styles.OutputBox}>
        <QuizSection problems={problems} userAnswers={userAnswers} handleAnswerChange={handleAnswerChange} />
        <button onClick={handleSubmit} disabled={loading}>{loading ? 'Checking your answers...' : 'Submit Answers'}</button>      
      </div>

      {solutions && <div>{solutions}</div>}

      {/*testing for submission> */}
      <form onSubmit={handleSubmitPDF}>
        <input type="file" name="file" accept="application/pdf" />
        <button type="submit">Upload and Extract Text</button>
      </form>
    </div>

      <div className={styles.SolutionBox}>
        {solutions && <div>{solutions}</div>}
      </div>
      <div className={styles.bottomContainer}>

      </div>
      </div>
  );
}