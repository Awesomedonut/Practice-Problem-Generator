import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use an environment variable for the API key
});

export default function Home() {
  // useState to store the questions
    async function callOpenAiApi(prompt: string) {
      try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
          max_tokens: 256
        });
        // Assuming the API returns the questions as a string or object
        console.log(chatCompletion.choices[0]?.message?.content);
      } catch (error) {
        console.error('Error calling OpenAI:', error);
      }
    }

    // Define the topic
    const topic = "CI/CD";

    // Append the topic to the prompt
    const prompt = `generate 2 questions about ${topic}`;

    // Call the function that will handle the API request
    callOpenAiApi(prompt);


  return (
    <div className={styles.container}>
    </div>
  );
}