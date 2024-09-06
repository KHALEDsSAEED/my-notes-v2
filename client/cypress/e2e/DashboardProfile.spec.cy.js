describe('Dashboard Profile Page Tests', () => {
  beforeEach(() => {
    // Sign in before running the tests
    cy.visit('http://localhost:5173/sign-in');
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for the sign-in to complete and navigate to the dashboard
    cy.url().should('include', '/dashboard');

    // Navigate to the profile tab
    cy.visit('http://localhost:5173/dashboard?tab=profile');
  });

  it('should display the header', () => {
    cy.get('[data-testid="header"]').should('be.visible');
  });

  it('should render the sidebar correctly', () => {
    // Check if the sidebar is visible and fixed at the top
    cy.get('[data-testid="dashboard-sidebar"]').should('be.visible');
  });

  it('should display the profile form with correct initial values', () => {
    cy.get('[data-testid="dashboard-profile"]').should('be.visible');
    cy.get('img').should('be.visible');
    cy.get('input[label="Email"]').should('be.visible');
    cy.get('input[label="Name"]').should('be.visible');
    cy.get('input[label="Photo URL"]').should('be.visible');
  });
});
