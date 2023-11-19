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

export default function Home() {
  const [topic, setTopic] = useState('');
  const [problems, setProblems] = useState('');
  const [solutions, setSolutions] = useState('');
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

  async function handleGenerateProblems() {
    handleGeneration(`Create a short practice problem for the following topic: ${topic}.`, setProblems);
  }

  async function handleGenerateSolutions() { //TODO: bug fix - figured out issue, server related due to vercel's free tier having only 10s
    handleGeneration(`Create a solution for this problem: ${problems}`, setSolutions);
  }
  

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
        <div className={styles.buttonsDiv}>
          <button onClick={handleGenerateProblems} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Problem'}
          </button>
        </div>
      </div>
      {problems && <div>{problems}</div>}
    </div>
  </div>

  );
}