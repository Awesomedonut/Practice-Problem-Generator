'use client';
export interface TextQuestion {
  question: string;
  questionType: 'text';
  answer: string;
}

export function printQuestion(questionData: TextQuestion): string {
  let output = questionData.question + '\n';
  return output;
  };

  export function printTextAnswer(questionData: TextQuestion): string {
    let output = questionData.answer + '\n';
    return output;
    };