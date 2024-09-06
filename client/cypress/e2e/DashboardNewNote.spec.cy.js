describe('Dashboard New Note Page Tests', () => {
  beforeEach(() => {
    // Sign in before running the tests
    cy.visit('http://localhost:5173/sign-in');
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for the sign-in to complete and navigate to dashboard
    cy.url().should('include', '/dashboard');

    cy.visit('http://localhost:5173/dashboard?tab=new-note');
  });

  it('should display the header', () => {
    cy.get('[data-testid="header"]').should('be.visible');
  });

  it('should render the sidebar correctly', () => {
    // Check if the sidebar is visible and fixed at the top
    cy.get('[data-testid="dashboard-sidebar"]').should('be.visible');
  });

  it('should allow filling out the form and submit a new note', () => {
    const uniqueTitle = `Test Note Title ${Date.now()}`;

    // Fill out the form with a unique title
    cy.get('input[name="title"]').type(uniqueTitle);
    cy.get('textarea[name="text"]').type('This is the content of the test note.');
    cy.get('select[name="category"]').select('work');

    // Check that the submit button is visible and enabled
    cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for toast notification and verify its success message
    cy.get('.Toastify__toast--success').should('be.visible').and('contain', 'Note added successfully');

    // Verify navigation to the dashboard by checking the URL or a specific element on the dashboard
    cy.url().should('eq', 'http://localhost:5173/dashboard?tab=notes');
  });
});