'use client';
import { TextQuestion, printQuestion, printTextAnswer } from '../interfaces/TextQuestion';
import { MultipleChoiceQuestion, printQuestionAndChoices, printMCAnswer } from '../interfaces/MultipleChoiceQuestion';

export type Problem = TextQuestion | MultipleChoiceQuestion;
export function printThing(problem:Problem): string {
    var output:string = "default return value if invalid question type"
    if (problem.questionType == "text") {
        output = printQuestion(problem);
        return output;
    }
    else if (problem.questionType == "multipleChoice") {
        output = printQuestionAndChoices(problem);
        return output;
    }
    return output;
}

export function printThingAnswers(problem:Problem):string {
    var output:string = "default return value if invalid question type"
    if (problem.questionType == "text") {
        output = printTextAnswer(problem);
        return output;
    }
    else if (problem.questionType == "multipleChoice") {
        output = printMCAnswer(problem);
        return output;
    }
    return output;
}

