describe('Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // Visit the home page
    // check if the header is displayed
    cy.get('[data-testid="header"]').should('be.visible'); 
  });

  //check if the header is displayed
  it('should display the logo of the website', () => {
    cy.get('[data-testid="logo"]').should('be.visible');
  });

  // check if the navbar is displayed
  it('should display the navbar', () => {
    cy.get('[data-testid="nav"]').should('be.visible');
  });

  // check if the menu is displayed
  it('should navigate to the home page when the logo is clicked', () => {
    cy.get('[data-testid="logo"]').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  // check if the menu is displayed  on different viewports
  it('should be able to display content in different viewports', () => {
    // small screens
    cy.viewport('iphone-6');
    cy.get('[data-testid="menu"]').should('not.be.visible');

    // medium screens
    cy.viewport('ipad-2');
    cy.get('[data-testid="menu"]').should('be.visible');

    // large screens
    cy.viewport('macbook-15');
    cy.get('[data-testid="menu"]').should('be.visible');
  });

  // check if the menu navigation works
  it('should navigate to the home page when the home link is clicked', () => {
    cy.get('[data-testid="menu"]').contains('Home').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should navigate to the about page when the about link is clicked', () => {
    cy.get('[data-testid="menu"]').contains('About').click();
    cy.url().should('eq', 'http://localhost:5173/about');
  });

  it('should navigate to the sign-in page when the sign-in button is clicked', () => {
    cy.get('[data-testid="nav"]').contains('Sign In').click();
    cy.url().should('eq', 'http://localhost:5173/sign-in');
  });
});


