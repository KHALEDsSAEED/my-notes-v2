describe('Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display the header', () => {
    cy.get('[data-testid="header"]').should('be.visible');
  });

  it('should display the correct page title', () => {
    cy.title().should('eq', 'My Notes');
  });

  it('should display the main heading and text content', () => {
    cy.get('h1').should('have.text', 'Organize Your Thoughts');
    cy.get('p').should('contain.text', 'Our notes app helps you keep track of your ideas and tasks with ease.');
  });

  it('should display the image with correct alt text', () => {
    cy.get('img')
      .should('be.visible')
      .and('have.attr', 'alt', 'Notes App');
  });

  it('should be able to display content in different viewports', () => {
    // Large screen
    cy.viewport('macbook-15');
    cy.get('h1').should('be.visible');
    cy.get('p').should('be.visible');
    cy.get('img').should('be.visible');

    // Medium screen
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.get('p').should('be.visible');
    cy.get('img').should('be.visible');

    // Mobile screen
    cy.viewport('iphone-6');
    cy.get('h1').should('be.visible');
    cy.get('p').should('be.visible');
    cy.get('img').should('be.visible');
  });
});
