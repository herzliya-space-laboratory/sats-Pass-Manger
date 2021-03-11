beforeEach(() => {
    cy.visit('http://localhost:3000/');
})
  
describe('next pass page', () => {
    it('check list limit', () => {
        cy.get('tbody').children().should('have.length', 10);
        cy.get('[placeholder="how many pass"]')
            .clear().type('50{enter}');
        cy.get('tbody').children().should('have.length', 50);
    })

})