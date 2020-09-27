// https://docs.cypress.io/api/introduction/api.html

import 'cypress-file-upload';

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

  it('correctly inputs form data', () => {
    const filePath = '../data/';
    const fileName = 'smaller-2';
    const fileExtension = '.xlsx';
    cy.get('#conference-name-field').type('Conference 1');
    cy.get('#input-file-field').attachFile({
      filePath: filePath + fileName + fileExtension,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      encoding: 'utf-8',
    });
    cy.get('[data-cy=select-colour-input]').type('Blue', { force: true });
    cy.get('[data-cy=build-programme-btn]').click({ force: true });

    cy.get('[data-cy=download-html-button]').contains(fileName);
  });
});
