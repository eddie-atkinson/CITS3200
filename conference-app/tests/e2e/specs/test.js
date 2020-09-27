// https://docs.cypress.io/api/introduction/api.html

import 'cypress-file-upload';

describe('My First Test', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit('/');
  });

  it('correctly starts over', () => {
    cy.get('.v-btn__content').contains('Start over').click();
    cy.contains('.v-card__title', 'Conference Programme Creator');
  });

  it('correctly gets started', () => {
    cy.get('.v-btn__content').contains('Get started').click();
    cy.contains('.v-card__title', 'Add files and select themes');
  });

  it('correctly inputs form data', () => {
    const testData = [
      {
        confName: 'Conference 1',
        fileName: 'test1',
        fileExt: '.xlsx',
        colour: 'Blue',
      },

      {
        confName: 'Conference 2',
        fileName: 'test2',
        fileExt: '.xlsx',
        colour: 'Orange',
      },

      {
        confName: '@@123 Conference 232333333333333333333333',
        fileName: 'test3',
        fileExt: '.xlsx',
        colour: 'Green',
      },
    ];

    const filePath = '../data/';

    cy.get('.v-btn__content').contains('Get started').click();

    cy.wrap(testData).each((data) => {
      cy.get('#conference-name-field').clear().type(data.confName);
      cy.get('[data-cy=input-file-field]').attachFile({
        filePath: filePath + data.fileName + data.fileExt,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        encoding: 'utf-8',
      });
      cy.get('[data-cy=select-colour-input]').type(data.colour, { force: true });
      cy.get('[data-cy=build-programme-btn]').click({ force: true });
      cy.get('[data-cy=download-html-button]').contains(data.fileName);
      cy.get('[data-cy=goBack-btn]').click();
    });
  });
});
