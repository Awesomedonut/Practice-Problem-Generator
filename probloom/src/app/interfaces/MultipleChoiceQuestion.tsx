'use client';
export interface MultipleChoiceQuestion {
  question: string;
  questionType: 'multipleChoice';
  choices: string[];
  answer: string;
  
}

export function printQuestionAndChoices(questionData: MultipleChoiceQuestion): string {
  let output = questionData.question + '\n';
      questionData.choices.forEach((choice: string, index: number) => {
        output += `${index + 1}: ${choice}\n`;
      });
      return output;
  };

  export function printMCAnswer(questionData: MultipleChoiceQuestion): string {
    let output = questionData.answer;
        return output;
    };


