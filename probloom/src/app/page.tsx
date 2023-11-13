'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [problems, setProblems] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerateProblems() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `Create practice problems for the following topic: ${topic}` }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setProblems(data.data);
    } catch (error) {
      console.error('Error calling /api/openai:', error);
      setError('Failed to generate problems. Please try again later.');
    } finally {
      setLoading(false);
    }
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
          {loading ? 'Generating...' : 'Generate Problems'}
        </button>
      </div>
      {problems && <div className={styles.problems}>{problems}</div>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
