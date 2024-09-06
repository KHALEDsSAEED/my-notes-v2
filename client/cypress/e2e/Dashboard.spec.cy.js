describe('Dashboard Page Tests', () => {
  beforeEach(() => {
    // Sign in before running the tests
    cy.visit('http://localhost:5173/sign-in');
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for the sign-in to complete and navigate to dashboard
    cy.url().should('include', '/dashboard');
  });

  it('should display the header', () => {
    cy.get('[data-testid="header"]').should('be.visible');
  });

  it('should render the sidebar correctly', () => {
    // Check if the sidebar is visible and fixed at the top
    cy.get('[data-testid="dashboard-sidebar"]').should('be.visible');
  });

  describe('Tab Tests', () => {
    it('should render DashboardProfile when "profile" tab is selected', () => {
      // Navigate to the profile tab
      cy.visit('http://localhost:5173/dashboard?tab=profile');
      // Verify if the DashboardProfile component is rendered
      cy.get('[data-testid="dashboard-profile"]').should('be.visible');
    });

    it('should render DashboardNotes when "notes" tab is selected', () => {
      // Navigate to the notes tab
      cy.visit('http://localhost:5173/dashboard?tab=notes');
      // Verify if the DashboardNotes component is rendered
      cy.get('[data-testid="dashboard-notes"]').should('be.visible');
    });

    it('should render DashboardNewNote when "new-note" tab is selected', () => {
      // Navigate to the new note tab
      cy.visit('http://localhost:5173/dashboard?tab=new-note');
      // Verify if the DashboardNewNote component is rendered
      cy.get('[data-testid="dashboard-new-note"]').should('be.visible');
    });
  });
});
