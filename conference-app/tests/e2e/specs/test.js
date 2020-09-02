// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('correctly starts over', () => {
    cy.visit('/');
    cy.get('.v-btn__content').contains('Start over').click();
    cy.contains('.v-card__title', 'Conference Programme Creator');
  });

  it('correctly gets started', () => {
    cy.visit('/');
    cy.get('.v-btn__content').contains('Get started').click();
    cy.contains('.v-card__title', 'Add files and select themes');
  });
});
