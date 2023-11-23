import { render, screen } from '@testing-library/react'
import Home from '../src/app/page';
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('renders a text box with the following placeholder text: Enter topic', () => {
    render(<Home />)
 
    const input = screen.getByPlaceholderText('Enter topic');

    expect(input).toBeInTheDocument()
  })
})