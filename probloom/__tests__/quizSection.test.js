import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuizSection from '../src/app/components/Quiz/QuizSection';
 
describe('QuizSection', () => {
  const mockProblems = [
    { 
      question: 'What is 2 + 2?', 
      questionType: 'text', 
      choices: [] 
    },
    { 
      question: 'What is the capital of France?', 
      questionType: 'multipleChoice', 
      choices: ['Paris', 'London', 'Berlin'] 
    }
  ];
  const mockAnswers = ['', ''];

  it('renders questions based on problems prop', () => {
    render(<QuizSection problems={mockProblems} userAnswers={mockAnswers} handleAnswerChange={() => {}} />);

    const firstQuestion = screen.getByText('Q1. What is 2 + 2?');
    const secondQuestion = screen.getByText('Q2. What is the capital of France?');

    expect(firstQuestion).toBeInTheDocument();
    expect(secondQuestion).toBeInTheDocument();
  });

  it('renders correct input type for each question', () => {
    render(<QuizSection problems={mockProblems} userAnswers={mockAnswers} handleAnswerChange={() => {}} />);
    const radioInputs = screen.getAllByRole('radio');
    expect(radioInputs.length).toBe(3); // 3 choices for the second question
  });
});