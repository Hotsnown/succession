/* prettier-ignore */
/*eslint-disable*/

describe('Intro page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('displays intro text', () => {
    cy.contains('Here are some examples');
  });
});
