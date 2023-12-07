import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import FileIn from '../src/app/components/FileIn/fileIn'

describe('FileIn Component', () => {
  it('renders without crashing', () => {
    render(<FileIn onReceive={() => {}} />);
  });

  it('renders a file input', () => {
    const { getByTestId } = render(<FileIn onReceive={() => {}} />);
    const fileInput = getByTestId('pdfInput');
    expect(fileInput).toBeInTheDocument();
  });

  it('contains a file input for PDFs', () => {
    const { getByTestId } = render(<FileIn onReceive={() => {}} />);
    const fileInput = getByTestId('pdfInput');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'application/pdf');
  })
  
it('sets up a file input change event listener', () => {
    const addEventListenerSpy = jest.spyOn(HTMLInputElement.prototype, 'addEventListener');
    render(<FileIn onReceive={() => {}} />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    addEventListenerSpy.mockRestore(); // Clean up the spy
  });

});