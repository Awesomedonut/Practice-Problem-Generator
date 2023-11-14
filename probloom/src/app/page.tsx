'use client';

import { useState } from 'react';
import styles from './page.module.css';

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
      setError('Failed to generate problems. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateProblems() {
    handleGeneration(`Create a short practice problem for the following topic: ${topic}.`, setProblems);
  }

  async function handleGenerateSolutions() { //TODO: bug fix - figured out issue... server related due to vercel's free tier having only 10s
    handleGeneration(`Create a solution for this problem: ${problems}`, setSolutions);
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
          className={styles.input}
        />
        <button onClick={handleGenerateProblems} className={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Problem'}
        </button>
        <button onClick={handleGenerateSolutions} className={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Solution'}
        </button>
      </div>
      {problems && <div className={styles.problems}>{problems}</div>}
      {solutions && <div className={styles.problems}>{solutions}</div>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
