describe('Teste 2E2 do componente Checkbox', () => {

  before(() => {
    Cypress.config('baseUrl', 'https://the-internet.herokuapp.com');
  })

  beforeEach(() => {
    cy.log('Acessa a webpage')
    cy.visit('/checkboxes')
  })

  it('Deve validar componentes da página checkbox', () => {
    cy.log('Valida o título da página')
    cy.title().should('include', 'The Internet')
    cy.log('Valida o texto no h3 da página')
    cy.get('h3').should('have.text', 'Checkboxes')
    cy.log('Valida que exatamente 2 elementos de checkbox estão presentes')
    cy.get('input[type="checkbox"]').its('length').should('eq', 2)
  })

  it('Deve validar estado inicial das checkboxes', () => {
    cy.log('Valida que a primeira checkbox não está marcada')
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
    cy.log('Valida que a segunda checkbox está marcada')
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')
  })

  it('Deve validar interatividade das checkboxes', () => {
    cy.log('Marca a primeira checkbox')
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    cy.log('Desmarca a primeira checkbox')
    cy.get('input[type="checkbox"]').eq(0).uncheck()
    cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')

    cy.log('Desmarca a segunda checkbox')
    cy.get('input[type="checkbox"]').eq(1).uncheck()
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
    cy.log('Marca a segunda checkbox')
    cy.get('input[type="checkbox"]').eq(1).check()
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')
  })
})