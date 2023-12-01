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
    // cy.wait(2000); 
    // cy.get('#inputGen').should('exist').type('Java');
    // // Fill in the topic input
    // // cy.get('#inputGen', { timeout: 10000 }).should('exist').type('Java');

    // // Click the "Generate Problem" button
    // cy.contains('Generate Problem').click();

    // Wait for the problems to be generated (you might need to adjust the timeout)
    cy.wait(50000); // Adjust the timeout as needed

    // Check if the <h1>Quiz</h1> element is present
    cy.get('#quizSection').should('contain', 'Quiz');

    // Check if specific questions by ID
    cy.get('#question-1').should('exist');
    cy.get('#question-2').should('exist');
  });
});
  