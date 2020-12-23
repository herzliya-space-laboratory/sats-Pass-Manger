beforeEach(() => {
  cy.visit('http://localhost:3000/');
})

describe('main page', () => {
  it('check nav scroling', () => {
    cy.get("nav ul li a").contains("next passes").click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get("nav ul li a").contains("about").click();
    cy.url().should('eq', 'http://localhost:3000/about');
    cy.get("nav ul li a").contains("satellites list").click();
    cy.url().should('eq', 'http://localhost:3000/satellitesList');
    cy.get("nav ul li a").contains("passes list").click();
    cy.url().should('eq', 'http://localhost:3000/passes');
  })

  it('check list limit', () => {
    cy.get('tbody').children().should('have.length', 10);
    cy.get('input[placeholder="how many pass"]').invoke('attr', 'test', 100);
    cy.wait(1000);
    cy.get('tbody').children().should('have.length', 100);
  })
})