'use client';
export interface MultipleChoiceQuestion {
  question: string;
  questionType: 'multipleChoice';
  choices: string[];
  answer: string;
}