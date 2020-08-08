// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('.v-btn__content', 'Hello vue!');
  });

  it('Navbar Navigation', () => {
    cy.visit('/');
    cy.get('.v-btn').contains('About').click();
    cy.contains('h1', 'This is an about page');
  });
});
