describe('Navigation', () => {
    it('should contain Probloom in heading', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
      cy.get('h1').contains('Probloom')
    })
  })

  
describe('Problem Generation', () => {
  it('should generate problems when selecting multiple choice question type and clicking the "Generate Problem" button', () => {
    cy.visit('http://localhost:3000/');

    //Set NEXT_PUBLIC_HIDE_DEFAULT_QUIZ to q in .env.local 
    
    cy.get('#inputGen').type('Java');
    cy.get('select').select('multipleChoice');
    cy.get('select').should('have.value', 'multipleChoice');
    // Click the "Generate Problem" button
    cy.contains('Generate Problem').click();
    // Wait for the problems to be generated (you might need to adjust the timeout)
    cy.wait(30000); // Adjust the timeout as needed

    // Check if the <h1>Quiz</h1> element is present
    cy.get('#quizSection').should('contain', 'Quiz');

    cy.get('#question-1').should('exist');
    cy.get('#question-2').should('exist');
  });

  it('should submit answers and show solutions', () => {
    cy.visit('http://localhost:3000/');

    //Set NEXT_PUBLIC_HIDE_DEFAULT_QUIZ to q in .env.local 
    
    cy.get('#inputGen').type('Java');
    // Click the "Generate Problem" button
    cy.contains('Generate Problem').click();
    // Wait for the problems to be generated (you might need to adjust the timeout)
    cy.wait(30000); // Adjust the timeout as needed

    // Check if the <h1>Quiz</h1> element is present
    cy.get('#quizSection').should('contain', 'Quiz');

    cy.get('#question-1').should('exist');
    cy.get('#question-2').should('exist');
    cy.get('#quizSolution').should('not.exist'); 

    cy.contains('Submit Answers').click();
    cy.wait(30000); // Adjust the timeout as needed
    cy.get('#quizSolution').should('exist'); 
    cy.contains('Restart').click();
    cy.wait(2000); 
    cy.get('#quizSection').should('not.exist');

  });

  it('should generate problems when selecting text question type and clicking the "Generate Problem" button', () => {
    cy.visit('http://localhost:3000/');

    //Set NEXT_PUBLIC_HIDE_DEFAULT_QUIZ to q in .env.local 
    
    cy.get('#inputGen').type('Java');
    cy.get('select').select('text');
    cy.get('select').should('have.value', 'text');
    // Click the "Generate Problem" button
    cy.contains('Generate Problem').click();
    // Wait for the problems to be generated (you might need to adjust the timeout)
    cy.wait(30000); // Adjust the timeout as needed

    // Check if the <h1>Quiz</h1> element is present
    cy.get('#quizSection').should('contain', 'Quiz');

    cy.get('#question-1').should('exist');
    cy.get('#question-2').should('exist');
    cy.get('#quizSolution').should('not.exist'); 

  });  

  });

describe('File Input', () => {
  it('should have a file input option', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#pdfInput').should('exist');
  })
})

describe('Output text', () => {
  it('should contain text', () => {
    cy.visit('http://localhost:3000/');
    cy.get("#outputText").should('have.text', '0');
  })
})

describe('FileIn Component Tests', () => {
  it('verifies PDF file upload', () => {
    cy.visit('http://localhost:3000/')
    cy.fixture('sample.pdf').then(fileContent => {
      cy.get('[data-testid="pdfInput"]').trigger('change', { force: true, dataTransfer: { files: [fileContent] } });
    });
  });
})
  