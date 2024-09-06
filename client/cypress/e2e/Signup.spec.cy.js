describe('Signup Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/sign-up');
  });

  // check if the header is displayed
  it('should display the header', () => {
    cy.get('[data-testid="header"]').should('be.visible');
  });

  // check if the text container is displayed
  it('should display the text container', () => {
    cy.get('[data-testid="text-container"]').should('be.visible');
  });

  // check if the logo and text are displayed
  it('should display the logo and the text inside the text div', () => {
    cy.get('[data-testid="text-logo"]').should('be.visible');
    cy.get('[data-testid="text-content"]')
      .should('be.visible')
      .and('have.text', 'Welcome, please sign up to continue');
  });

  // check if the form container is displayed
  it('should display the form container', () => {
    cy.get('[data-testid="form-container"]').should('be.visible');
  });

  // check if the sign-up form is displayed by default and the form elements are visible
  it('should display the sign-in form by default', () => {
    cy.get('[data-testid="form-container"] form').within(() => {
      cy.get('input[id="email"]').should('be.visible');
      cy.get('input[id="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain.text', 'Sign Up');
    });
  });

  it('should fill and submit the sign-up form, show success toast, and navigate to dashboard', () => {
    // Generate a unique email address
    const uniqueEmail = `test-${Date.now()}@example.com`;

    // Fill in the sign-up form with the unique email
    cy.get('input[id="email"]').type(uniqueEmail);
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify success toast message
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and('contain', 'Sign up successful!');

    // Verify navigation to the dashboard
    cy.url().should('include', '/dashboard?tab=profile');
  });
  it('should display the "Have an Account?" section and navigate to sign-in page on link click', () => {
    // Check if the "Have an Account?" section is visible
    cy.get('[data-testid="container"]').should('be.visible');

    // Check if the "Sign In" link is present and has the correct text
    cy.get('[data-testid="link"]').should('be.visible').and('contain.text', 'Sign In');

    // Click on the "Sign In" link
    cy.get('[data-testid="link"]').click();

    // Verify navigation to the sign-in page
    cy.url().should('include', '/sign-in');
  });


});
