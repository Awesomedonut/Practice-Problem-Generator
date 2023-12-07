import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('allows selecting a question type from the dropdown', () => {
    render(<Home />);
    
    // Find the select element by its id
    const selectElement = screen.getByTestId('ddlQuestionType');

    // Check if the initial value is an empty string
    expect(selectElement).toHaveValue('');

    // Select "Multiple Choice" from the dropdown
    fireEvent.change(selectElement, { target: { value: 'multipleChoice' } });

    // Check if the value has been updated to 'multipleChoice'
    expect(selectElement).toHaveValue('multipleChoice');

    // Select "Text" from the dropdown
    fireEvent.change(selectElement, { target: { value: 'text' } });

    // Check if the value has been updated to 'text'
    expect(selectElement).toHaveValue('text');
  });

  it('initially does not render the topic text', () => {
    render(<Home />);

    const topicText = screen.queryByText('Topic');

    expect(topicText).not.toBeInTheDocument();
  })

})