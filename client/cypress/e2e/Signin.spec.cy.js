describe('Sign In Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/sign-in');
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
      .and('have.text', 'Welcome, please sign in to continue');
  });

  // check if the form container is displayed
  it('should display the form container', () => {
    cy.get('[data-testid="form-container"]').should('be.visible');
  });

  // check if the sign-in form is displayed by default and the form elements are visible
  it('should display the sign-in form by default', () => {
    cy.get('[data-testid="form-container"] form').within(() => {
      cy.get('input[id="email"]').should('be.visible');
      cy.get('input[id="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain.text', 'Sign In');
    });
  });

  it('should fill and submit the sign-in form, show success toast, and navigate to dashboard', () => {
    // Fill the sign-in form and submit
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for toast notification and verify its success message
    cy.get('.Toastify__toast--success').should('be.visible').and('contain', 'Sign in successful!');

    // Verify navigation to the dashboard by checking the URL or a specific element on the dashboard
    cy.url().should('eq', 'http://localhost:5173/dashboard?tab=profile');
  });

  // check if the "Forgot Password" link is displayed and clickable
  it('should display the reset password form when clicking "Reset"', () => {
    cy.contains('Reset').click();

    // Verify that the reset form is displayed and its elements are visible
    cy.get('[data-testid="form-container"] form').within(() => {
      cy.get('input[type="email"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain.text', 'Send Reset Link');
    });
  });

  // check if the sign in functionality works
  it('should fill and submit the reset password form, show success toast, and navigate back to sign-in', () => {
    // Click the "Reset" link to show the reset form
    cy.contains('Reset').click();

    // Fill in the reset form and submit
    cy.get('input[type="email"]').type('reset@example.com');
    cy.get('button[type="submit"]').click();

    // Wait for success toast notification
    cy.get('.Toastify__toast--success').should('be.visible').and('contain', 'Password reset email sent! Please check your inbox.');

    // Verify it navigates back to the sign-in page
    cy.url().should('include', '/sign-in');

  });

  // check if the "Back to Sign In" link is displayed and clickable
  it('should navigate back to the sign-in form after clicking "Back to Sign In"', () => {
    cy.contains('Reset').click();
    cy.contains('Back to Sign In').click();
  });
});