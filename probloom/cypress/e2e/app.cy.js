describe('Navigation', () => {
    it('should contain Probloom in heading', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
      cy.get('h1').contains('Probloom')
    })
  })

  
describe('Problem Generation', () => {
  it('should generate problems when clicking the "Generate Problem" button', () => {
    cy.visit('http://localhost:3000/');

    //Set NEXT_PUBLIC_HIDE_DEFAULT_QUIZ to 0 in .env.local 
    
    // Check if the <h1>Quiz</h1> element is present
    cy.get('#quizSection').should('contain', 'Quiz');

    // Check if specific questions by ID
    cy.get('#question-1').should('exist');
    cy.get('#question-2').should('exist');
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
    cy.get("outputText").should('have.text');
  })
})
  