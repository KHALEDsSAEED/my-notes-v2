describe('About page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/about');
  });

  it('should display the header', () => {
    cy.get('[data-testid="header"]').should('be.visible');
  });

  it('should display the About Us heading', () => {
    cy.get('h1').should('have.text', 'About Us').and('be.visible');
  });

  it('should display the logo within the first paragraph', () => {
    cy.get('p').first().within(() => {
      cy.get('svg').should('exist');
    });
  });

  it('should display the correct text in the first paragraph', () => {
    cy.get('p').first().should('contain.text', 'Welcome to').and('contain.text', 'This app is designed to help you organize your thoughts');
  });

  it('should display the correct text in the second paragraph', () => {
    cy.get('p').eq(1).should('contain.text', 'Our mission is to provide a clean, intuitive platform for managing your notes');
  });

  it('should display the correct text in the third paragraph', () => {
    cy.get('p').last().should('contain.text', 'Thank you for using our Notes App, and we hope it helps you stay organized and productive');
  });

})