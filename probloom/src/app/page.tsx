'use client';

import { useState } from 'react';
import styles from './page.module.css';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default function Home() {
  const [topic1, setTopic1] = useState('');
  const [topic2, setTopic2] = useState('');
  const [problems1, setProblems1] = useState('');
  const [problems2, setProblems2] = useState('');

  async function generateProblems(topic: string, setProblems: any) {
    if (!topic) return; // If no topic is provided, don't attempt the API call

    const prompt = `Create practice problems for the following topic: ${topic}`;
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
        max_tokens: 256,
      });
      setProblems(response.choices[0]?.message?.content);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      setProblems('Failed to generate problems. Please try again later.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={topic1}
          onChange={(e) => setTopic1(e.target.value)}
          placeholder="Enter topic 1"
          className={styles.input}
        />
        <button onClick={() => generateProblems(topic1, setProblems1)} className={styles.button}>
          Generate Problems for Topic 1
        </button>
        {problems1 && <div className={styles.problems}>{problems1}</div>}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          value={topic2}
          onChange={(e) => setTopic2(e.target.value)}
          placeholder="Enter topic 2"
          className={styles.input}
        />
        <button onClick={() => generateProblems(topic2, setProblems2)} className={styles.button}>
          Generate Problems for Topic 2
        </button>
        {problems2 && <div className={styles.problems}>{problems2}</div>}
      </div>
    </div>
  );
}
