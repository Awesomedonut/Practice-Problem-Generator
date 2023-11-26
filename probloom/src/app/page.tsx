'use client';

import { getDocument } from 'pdfjs-dist';

import { useState } from 'react';
import styles from './page.module.css';
import { useEffect } from 'react';

import FileIn from './components/FileIn/fileIn';
import { Problem } from './types/Problem';
import QuizSection from './components/Quiz/QuizSection';
import { fileFromPath } from 'openai';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]); // Update the state type
  const [solutions, setSolutions] = useState('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadOption, setDownloadOption] = useState('');

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
        choices: [" choice 1", " choice 2", " choice 3", " choice 4"],
        answer: "answer here"
      },
      {
        question: "question here",
        questionType: "text",
        answer: "answer here"
      }
    ]);
  }, []);

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
    // var content = checkInputType();
    var prompt = `
        You are a very experienced teacher and you can create problems after reading some content; the content section will always end with "@@##".
        You now need to create two short practice problems based on content I will give you;
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
        The content is ${content.replace("@","").replace("#","")}. @@##
        The JSON response:`
    console.log(prompt);

    handleGeneration(prompt, setUpQuiz);

//     handleGeneration(`
//     Create two short practice problem for the following topic: ${topic},
//     the question type is ${questionType}. 
//  if the question type is multipleChoice, give me choices,
//     and answer. if the question type is text, only give me answer.
//     Do not include any explanations, only provide a  RFC8259 compliant JSON response 
//     following this format without deviation.
//     [{
//       "question": "question here", 
//     "questionType": "multipleChoice or text", 
//     "choices":["choice 1","choice 2","choice 3","choice 4"], 
//     "answer":"answer here"}]
//     The JSON response:`, setUpQuiz);
//   }
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
  const printContent = (text: string)=>{
    console.log("*********");
    console.log(text);
  }
  const checkInputType = () => {
    let pdf = (document.getElementById('pdfInput') as HTMLInputElement);
    let text = (document.getElementById('inputGen')as HTMLInputElement);
    if (text.value = '' && pdf.value != '') {
      console.log(pdf.value)
      return pdf.value;
    }
    else if ((text.value != '') && (pdf.value = '')) {
      console.log(text.value)
      return text.value;
    }
    console.log("empty");
    // else return;
 }

 const downloadQuestionsPDF = () => {
  var pdfMake = require('pdfmake/build/pdfmake.js');
  var docDefinition = {
    content: [
      {text: {problems}}
    ],
    defaultStyle: {
    }
  };
  pdfMake.createPdf(docDefinition).print();
 }

 const downloadAnswersPDF = () => {
  var pdfMake = require('pdfmake/build/pdfmake.js');
  var docDefinition = {
    content: [
      {text: {solutions}}
    ],
    defaultStyle: {
    }
  };
  pdfMake.createPdf(docDefinition).print();
 }

 const downloadQAPDF = () => {
  var pdfMake = require('pdfmake/build/pdfmake.js');
  var docDefinition = {
    content: [
      {text: ({problems} + '\n\n' + {solutions})}
    ],
    defaultStyle: {
    }
  };
  pdfMake.createPdf(docDefinition).print();
 }

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
        <div className={styles.fileInputContainer}>
          <FileIn onReceive={setContent}></FileIn>
          <label htmlFor='pdfInput' className={styles.customFileInputButton}>Choose PDF</label>
        </div>
           </div>
            
          <input type="text" id="inputGen" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter topic" />

          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className={styles.dropdown}>
            <option value="">Select Question Type</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="text">Text</option>
          </select>
        </div>
        <div className={styles.buttonsDiv}>
          <button onClick={handleGenerateProblems} disabled={loading}><a href="#quizSection">{loading ? 'Generating...' : 'Generate Problem'}</a></button>
        </div>

        <div id="quizSection" className={styles.quizSection}>

      </div>
      <div className={styles.TopicBox}>
        <p>{topic}</p>
      </div>
      <div className={styles.OutputBox}>
        <QuizSection problems={problems} userAnswers={userAnswers} handleAnswerChange={handleAnswerChange} />
        <button className={styles.submitAnswersButton} onClick={handleSubmit} disabled={loading}>{loading ? 'Checking your answers...' : 'Submit Answers'}</button>      
      </div>
    </div>
      <div className={styles.SolutionBox}>
        {solutions && <div>{solutions}</div>}
      </div>
      <div className={styles.downloadBox}>
        <button onClick={downloadQuestionsPDF}>Download Questions</button>
        <button onClick={downloadAnswersPDF}>Download Answers</button>
        <button onClick={downloadQAPDF}>Download Q&A</button>
      </div>
      <div className={styles.bottomContainer}>
      <p id="outputText"></p>
    </div>
  </div>
  );
}