'use client';
import { TextQuestion } from '../interfaces/TextQuestion';
import { MultipleChoiceQuestion } from '../interfaces/MultipleChoiceQuestion';

export type Problem = TextQuestion | MultipleChoiceQuestion;
